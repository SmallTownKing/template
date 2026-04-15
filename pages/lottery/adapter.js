export const adaptScheduleLogInfo = (apiData = {}) => {
	const logList = apiData.data || []
	return logList.map(item => {
		return {
			id: item.id,
			userInfo: item.getUser,
			time: item.add_time,
			goodsInfo: item.goodsInfo
		}
	})
}

export const adaptScheduleDetailInfo = (apiData = {}) => {
	const detailInfo = apiData.data || {}
	return {
		goodsList: detailInfo.goodsList.map(item => {
			return {
				id: item.id,
				probabilityText: item.probability_text,
				stock: item.stock,
				num: item.stock,
				pictrue: item.goodsInfo.picture,
				price: item.goodsInfo.price,
				title: item.goodsInfo.title,
				version: item.goodsInfo.version
			}
		}),
		versionInfo: {
			rateList: detailInfo.result.map(item => {
				return {
					level: item.version,
					percent: item.ratio_text
				}
			}),
			title: detailInfo.totalFa
		}
	}
}

