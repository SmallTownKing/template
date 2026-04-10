const noop = () => {}

const normalizeCategoryId = (value) => {
	const nextValue = Number(value || 0)
	return Number.isFinite(nextValue) ? nextValue : 0
}

const parseSocketPayload = (input) => {
	if (input === null || input === undefined) {
		return {}
	}

	if (typeof input === 'string') {
		try {
			return JSON.parse(input)
		} catch (error) {
			return {
				type: 'raw',
				data: input
			}
		}
	}

	if (typeof input === 'object' && input.data !== undefined) {
		return parseSocketPayload(input.data)
	}

	return input
}

export const createHomeSocketEntry = (options = {}) => {
	const {
		url = '',
		protocols,
		getCurrentCategoryId,
		onOpen = noop,
		onClose = noop,
		onError = noop,
		onMessage = noop,
		onBannerUpdate = noop,
		onHeaderUpdate = noop,
		onProductUpdate = noop
	} = options

	let socketTask = null
	let connected = false
	let currentCategoryId = normalizeCategoryId(getCurrentCategoryId?.())

	const subscribeCurrentCategory = () => {
		if (!connected || !socketTask || typeof socketTask.send !== 'function' || !currentCategoryId) {
			return
		}

		// TODO: send the home category subscription message here after the websocket API is ready.
		// socketTask.send({
		// 	data: JSON.stringify({
		// 		action: 'home.subscribe',
		// 		category_id: currentCategoryId
		// 	})
		// })
	}

	const applyMessage = (payload = {}) => {
		onMessage(payload)

		const messageType = payload.type || payload.event || ''
		const messageData = payload.data || payload.payload || payload
		const payloadCategoryId = normalizeCategoryId(
			payload.categoryId || payload.category_id || messageData?.categoryId || messageData?.category_id
		)

		if (messageType === 'home.banner.update') {
			onBannerUpdate(messageData)
			return
		}

		if (messageType === 'home.header.update') {
			onHeaderUpdate(messageData)
			return
		}

		if (messageType === 'home.product.update') {
			onProductUpdate(messageData, {
				categoryId: payloadCategoryId
			})
		}
	}

	const handleSocketMessage = (event) => {
		const payload = parseSocketPayload(event)
		applyMessage(payload)
	}

	const connect = () => {
		currentCategoryId = normalizeCategoryId(getCurrentCategoryId?.() || currentCategoryId)

		if (!url || socketTask) {
			return
		}

		socketTask = uni.connectSocket({
			url,
			protocols,
			complete: () => {}
		})

		socketTask.onOpen((event) => {
			connected = true
			onOpen(event)
			subscribeCurrentCategory()
		})

		socketTask.onMessage((event) => {
			handleSocketMessage(event)
		})

		socketTask.onError((event) => {
			onError(event)
		})

		socketTask.onClose((event) => {
			connected = false
			socketTask = null
			onClose(event)
		})
	}

	const disconnect = () => {
		if (socketTask && typeof socketTask.close === 'function') {
			socketTask.close({
				code: 1000,
				reason: 'home-page-hide'
			})
		}

		connected = false
		socketTask = null
	}

	const updateCategory = (nextCategoryId) => {
		currentCategoryId = normalizeCategoryId(nextCategoryId)
		subscribeCurrentCategory()
	}

	return {
		connect,
		disconnect,
		updateCategory,
		applyMessage,
		handleSocketMessage
	}
}

export default createHomeSocketEntry
