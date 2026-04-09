const isPlainObject = (value) => {
	return Object.prototype.toString.call(value) === '[object Object]'
}

const cloneValue = (value) => {
	if (Array.isArray(value)) {
		return value.map((item) => cloneValue(item))
	}

	if (isPlainObject(value)) {
		return Object.keys(value).reduce((result, key) => {
			result[key] = cloneValue(value[key])
			return result
		}, {})
	}

	return value
}

const getStorageApi = () => {
	if (typeof uni !== 'undefined') {
		return {
			get: typeof uni.getStorageSync === 'function' ? uni.getStorageSync : null,
			set: typeof uni.setStorageSync === 'function' ? uni.setStorageSync : null,
			remove: typeof uni.removeStorageSync === 'function' ? uni.removeStorageSync : null
		}
	}

	if (typeof localStorage !== 'undefined') {
		return {
			get: (key) => localStorage.getItem(key),
			set: (key, value) => localStorage.setItem(key, value),
			remove: (key) => localStorage.removeItem(key)
		}
	}

	return {
		get: null,
		set: null,
		remove: null
	}
}

const getValueByPath = (source, path) => {
	return String(path).split('.').reduce((result, segment) => {
		if (result === null || result === undefined) {
			return undefined
		}

		return result[segment]
	}, source)
}

const setValueByPath = (target, path, value) => {
	const segments = String(path).split('.')
	let cursor = target

	segments.forEach((segment, index) => {
		if (index === segments.length - 1) {
			cursor[segment] = value
			return
		}

		if (!isPlainObject(cursor[segment])) {
			cursor[segment] = {}
		}

		cursor = cursor[segment]
	})
}

const pickState = (state, paths) => {
	if (!Array.isArray(paths) || !paths.length) {
		return cloneValue(state)
	}

	return paths.reduce((result, path) => {
		const value = getValueByPath(state, path)

		if (value !== undefined) {
			setValueByPath(result, path, cloneValue(value))
		}

		return result
	}, {})
}

const parseStoredState = (rawValue) => {
	if (!rawValue || typeof rawValue !== 'string') {
		return null
	}

	try {
		return JSON.parse(rawValue)
	} catch (error) {
		return null
	}
}

export const piniaPersistPlugin = ({ options, store }) => {
	const persist = options.persist

	if (!persist) {
		return
	}

	const storage = getStorageApi()
	const storageKey =
		isPlainObject(persist) && persist.key ? persist.key : `pinia:${store.$id}`
	const paths = isPlainObject(persist) && Array.isArray(persist.paths) ? persist.paths : null

	if (typeof storage.get === 'function') {
		const cachedState = parseStoredState(storage.get(storageKey))

		if (cachedState && isPlainObject(cachedState)) {
			store.$patch(cachedState)
		}
	}

	store.$subscribe(
		(_, state) => {
			if (typeof storage.set !== 'function') {
				return
			}

			const nextState = pickState(state, paths)

			try {
				storage.set(storageKey, JSON.stringify(nextState))
			} catch (error) {}
		},
		{
			detached: true
		}
	)

	if (isPlainObject(persist) && persist.clearOnInit && typeof storage.remove === 'function') {
		try {
			storage.remove(storageKey)
		} catch (error) {}
	}
}
