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

const normalizePersistEntries = (paths) => {
	if (!Array.isArray(paths)) {
		return []
	}

	return paths
		.map((item) => {
			if (typeof item === 'string' && item) {
				return {
					path: item,
					key: '',
					legacyKeys: [],
					raw: false
				}
			}

			if (isPlainObject(item) && item.path) {
				return {
					path: String(item.path),
					key: item.key ? String(item.key) : '',
					legacyKeys: Array.isArray(item.legacyKeys) ? item.legacyKeys.map((key) => String(key)) : [],
					raw: Boolean(item.raw)
				}
			}

			return null
		})
		.filter(Boolean)
}

const resolveEntryStorageKey = (baseKey, entry) => {
	if (entry.key) {
		return entry.key
	}

	return `${baseKey}:${String(entry.path).split('.').join(':')}`
}

const parseStoredState = (rawValue) => {
	if (rawValue === undefined || rawValue === null) {
		return null
	}

	if (typeof rawValue !== 'string') {
		return rawValue
	}

	try {
		return JSON.parse(rawValue)
	} catch (error) {
		return null
	}
}

const parseEntryStoredState = (rawValue, entry) => {
	if (rawValue === undefined || rawValue === null) {
		return null
	}

	if (!entry.raw) {
		return parseStoredState(rawValue)
	}

	if (typeof rawValue !== 'string') {
		return rawValue
	}

	// Backward compatible with previously JSON-stringified raw values.
	if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
		try {
			return JSON.parse(rawValue)
		} catch (error) {}
	}

	return rawValue
}

const serializeEntryStoredState = (value, entry) => {
	if (entry.raw && typeof value === 'string') {
		return value
	}

	return JSON.stringify(cloneValue(value))
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
	const split = Boolean(isPlainObject(persist) && persist.split)
	const entries = normalizePersistEntries(paths)

	if (typeof storage.get === 'function') {
		if (split && entries.length) {
			const cachedState = entries.reduce((result, entry) => {
				const entryStorageKey = resolveEntryStorageKey(storageKey, entry)
				let rawValue = storage.get(entryStorageKey)

				if ((rawValue === null || rawValue === undefined || rawValue === '') && entry.legacyKeys.length) {
					for (const legacyKey of entry.legacyKeys) {
						rawValue = storage.get(legacyKey)
						if (rawValue !== null && rawValue !== undefined && rawValue !== '') {
							break
						}
					}
				}
				const parsedValue = parseEntryStoredState(rawValue, entry)

				if (parsedValue !== null) {
					setValueByPath(result, entry.path, parsedValue)
				}

				return result
			}, {})

			if (Object.keys(cachedState).length) {
				store.$patch(cachedState)
			} else {
				const legacyState = parseStoredState(storage.get(storageKey))

				if (legacyState && isPlainObject(legacyState)) {
					store.$patch(legacyState)
				}
			}
		} else {
			const cachedState = parseStoredState(storage.get(storageKey))

			if (cachedState && isPlainObject(cachedState)) {
				store.$patch(cachedState)
			}
		}
	}

	store.$subscribe(
		(_, state) => {
			if (typeof storage.set !== 'function') {
				return
			}

			try {
				if (split && entries.length) {
					entries.forEach((entry) => {
						const entryStorageKey = resolveEntryStorageKey(storageKey, entry)
						const entryValue = getValueByPath(state, entry.path)

						if (entryValue === undefined) {
							if (typeof storage.remove === 'function') {
								storage.remove(entryStorageKey)
							}
							return
						}

						storage.set(entryStorageKey, serializeEntryStoredState(entryValue, entry))

						if (typeof storage.remove === 'function' && entry.legacyKeys.length) {
							entry.legacyKeys.forEach((legacyKey) => {
								storage.remove(legacyKey)
							})
						}
					})

					if (typeof storage.remove === 'function') {
						storage.remove(storageKey)
					}
					return
				}

				const nextState = pickState(state, paths)
				storage.set(storageKey, JSON.stringify(nextState))
			} catch (error) {}
		},
		{
			detached: true
		}
	)

	if (isPlainObject(persist) && persist.clearOnInit && typeof storage.remove === 'function') {
		try {
			if (split && entries.length) {
				entries.forEach((entry) => {
					storage.remove(resolveEntryStorageKey(storageKey, entry))
				})
			}
			storage.remove(storageKey)
		} catch (error) {}
	}
}
