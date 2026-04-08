const normalizeScheduleItem = (item) => {
	return {
		id: item.id,
		time: `${item.start_at} - ${item.end_at}`,
		title: item.module_title,
		desc: item.module_desc
	}
}

export const adaptScheduleTabsModule = (apiData = {}) => {
	const tabs = (apiData.tab_list || []).map((item, index) => {
		return {
			key: String(item.code || index),
			label: item.name || `档期${index + 1}`,
			badge: item.badge || ''
		}
	})

	const fallbackKey = tabs[0]?.key || ''
	const defaultKey = String(apiData.default_tab || fallbackKey)
	const activeKey = tabs.some((item) => item.key === defaultKey) ? defaultKey : fallbackKey

	const contentMap = Object.keys(apiData.schedule_map || {}).reduce((result, key) => {
		result[String(key)] = (apiData.schedule_map[key] || []).map(normalizeScheduleItem)
		return result
	}, {})

	return {
		title: apiData.module_name || '档期安排',
		desc: apiData.module_desc || '',
		activeKey,
		tabs,
		contentMap
	}
}
