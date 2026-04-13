import { getUserAccount, getUserInfo } from '@/apis/user'
import { pinia, useAppStore } from '@/stores'

let refreshCurrentUserPromise = null

const createInitialUserAccount = () => ({
	balance: '',
	integralBalance: ''
})

const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target || {}, key)

const resolveResponsePayload = (response) => {
	return response?.data ?? response ?? null
}

const resolveProfilePayload = (response) => {
	const payload = resolveResponsePayload(response)

	if (!payload || typeof payload !== 'object') {
		return null
	}

	if (hasOwn(payload, 'userInfo')) {
		return payload.userInfo || null
	}

	if (hasOwn(payload, 'profile')) {
		return payload.profile || null
	}

	return payload
}

const resolveAccountPayload = (response) => {
	const payload = resolveResponsePayload(response)

	if (!payload || typeof payload !== 'object') {
		return createInitialUserAccount()
	}

	if (hasOwn(payload, 'userAccount')) {
		return normalizeUserAccount(payload.userAccount)
	}

	if (hasOwn(payload, 'account')) {
		return normalizeUserAccount(payload.account)
	}

	return normalizeUserAccount(payload)
}

const getAccountItemValue = (item) => {
	if (item === null || item === undefined) {
		return ''
	}

	if (typeof item !== 'object') {
		return String(item)
	}

	return (
		item.account ??
		item.balance ??
		item.amount ??
		item.value ??
		item.money ??
		''
	)
}

const normalizeUserAccount = (payload) => {
	const result = createInitialUserAccount()

	if (Array.isArray(payload)) {
		payload.forEach((item) => {
			const itemId = Number(item?.id)
			const itemValue = getAccountItemValue(item)

			if (itemId === 1) {
				result.balance = itemValue
			}

			if (itemId === 2) {
				result.integralBalance = itemValue
			}
		})

		return result
	}

	if (!payload || typeof payload !== 'object') {
		return result
	}

	result.balance =
		payload.balance ??
		payload.accountBalance ??
		payload.cashBalance ??
		payload.availableBalance ??
		result.balance

	result.integralBalance =
		payload.integralBalance ??
		payload.pointsBalance ??
		payload.pointBalance ??
		payload.integral ??
		payload.points ??
		result.integralBalance

	return result
}

const getAppStore = () => useAppStore(pinia)

export const refreshUserProfile = async (params = {}, options = {}) => {
	const appStore = getAppStore()

	if (!appStore.isLogin && !options.skipLoginCheck) {
		return null
	}

	const response = await getUserInfo(params, options)
	const profilePayload = resolveProfilePayload(response)

	if (profilePayload && typeof profilePayload === 'object') {
		if (options.replace) {
			appStore.setProfile(profilePayload)
		} else {
			appStore.patchProfile(profilePayload)
		}
	}

	return response
}

export const refreshUserAccount = async (params = {}, options = {}) => {
	const appStore = getAppStore()

	if (!appStore.isLogin && !options.skipLoginCheck) {
		return null
	}

	const response = await getUserAccount(params, options)
	const accountPayload = resolveAccountPayload(response)

	if (accountPayload && typeof accountPayload === 'object') {
		if (options.replace) {
			appStore.setUserAccount(accountPayload)
		} else {
			appStore.patchUserAccount(accountPayload)
		}
	}

	return response
}

export const refreshCurrentUser = async (options = {}) => {
	const appStore = getAppStore()

	if (!appStore.isLogin && !options.skipLoginCheck) {
		return null
	}

	if (refreshCurrentUserPromise && !options.force) {
		return refreshCurrentUserPromise
	}

	const profileParams = options.profileParams || {}
	const accountParams = options.accountParams || {}
	const profileOptions = options.profileOptions || {}
	const accountOptions = options.accountOptions || {}

	refreshCurrentUserPromise = Promise.all([
		refreshUserProfile(profileParams, {
			...profileOptions,
			skipLoginCheck: true
		}),
		refreshUserAccount(accountParams, {
			...accountOptions,
			skipLoginCheck: true
		})
	])
		.then(([profileResponse, accountResponse]) => {
			return {
				profileResponse,
				accountResponse
			}
		})
		.finally(() => {
			refreshCurrentUserPromise = null
		})

	return refreshCurrentUserPromise
}

export const clearCurrentUserRefreshState = () => {
	refreshCurrentUserPromise = null
}
