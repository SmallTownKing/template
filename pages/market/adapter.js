export const adaptProductList = (apiData = {}) => {
	const productList = apiData?.data?.list || []
    // userInfo: {
	// 			avatar: 'https://img.showgo.gg/avatar1/default_40.webp',
	// 			username: 'SHOWGER 68217',
	// 			level: '5',
	// 			time: '09 Apr, 04:40:56 PM'
	// 		},
	// 		goodsList: [
	// 			{ image: 'https://img.showgo.gg/cards/4_66376.webp', badgeType: 'lightning', quantity: 1 },
	// 		],
	// 		totalCount: 24,
	// 		totalPrice: '120.00',
	// 		currency: 'RM'
	return productList.map((item) => {
		return {
			userInfo: {
                avatar: item.getUser?.picture || 'https://img.showgo.gg/avatar1/default_40.webp',
                username: item.getUser?.nickname,
                level: item.getUser?.level || '5',
                time: item.add_time
            },
            goodsList: item?.goods_info.map(item => {
                return {
                    image: item.picture,
                    quantity: item.num
                }
            }),
            totalCount: item.goods_info.reduce((total, current) => total + current.num, 0),
            totalPrice: item.price,
            currency: 'vnd'
		}
	})
}