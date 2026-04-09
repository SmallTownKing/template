export const adaptScheduleBanner = (apiData = {}) => {
	const demo = [
		{
			id: 1,
			image: 'https://img.showgo.gg/brand/images/20260110/083c710596a74eed9945b0bf1b1b336f.webp'
		},
		{
			id: 2,
			image: 'https://img.showgo.gg/brand/images/20251031/b014b489cc4a5c5cfc360309022dc23a.webp'
		},
		{
			id: 3,
			image: 'https://img.showgo.gg/brand/images/20250818/43647e99a86d57f97c9967419ba7fb4f.webp'
		},
		{
			id: 4,
			image: 'https://img.showgo.gg/brand/images/20250812/9c56703fd4efe30f7634c597ff5eccf4.png'
		}
	]
	return demo
	const bannerList = apiData?.data?.list || []
	return bannerList.map((item) => {
		return {
			id: item.id,
			image: item.file.show_src,
			link: item.open_url
		}
	})
}


export const adaptHeaderList = (apiData = {}) => {
	const demo = [
		{
			avatar: 'https://img.showgo.gg/storage/upload/user/d0d6aa60b1dc5d103835425ccef944bc_69c6787f88a59.jpg',
			price: '100.00',
			name: '张三',
			level: 1,
			prizeImg: 'https://img.showgo.gg/cards/4_66759.webp?x-oss-process=image/resize,p_30'
		},
		{
			avatar: 'https://img.showgo.gg/avatar1/default_21.webp',
			price: '200.00',
			name: '李四',
			level: 10,
			prizeImg: 'https://img.showgo.gg/cards/4_60186.webp?x-oss-process=image/resize,p_30'
		},
		{
			avatar: 'https://img.showgo.gg/avatar1/default_14.webp',
			price: '300.00',
			name: '王五',
			level: 21,
			prizeImg: 'https://img.showgo.gg/cards/4_66324.webp?x-oss-process=image/resize,p_30'
		}
	]
	return demo
	const headerList = apiData?.data?.data || []
	return headerList.map((item) => {
		return {
			avatar: item.getUser.picture,
			price: item.price,
			name: item.getUser.nickname,
			level: item.getUser.vip_level,
			prizeImg: item.goodsInfo?.picture,
		}
	})
}


export const adaptProductList = (apiData = {}) => {
	const demo = [
		{
			id: 1,
			image: 'https://img.showgo.gg/goodsCate/images/20260104/f436244fc21021bc600e72021c7fac5e.webp?v=2026-03-17%2017:57:51',
			stock: '66716',
			title:'Bút chì nhồi Shin: Kích thích cười ngay',
			salesNum: '22418',
			salesText: 'Đã bán trong 3 giờ gần đây',
			currency: 'RM',
			price: '0.89'
		},
		{
			id: 2,
			image: 'https://img.showgo.gg/goodsCate/images/20260104/89f0c3c0aefdea3564a27b64e8afe09e.webp?v=2026-03-09%2013:45:06',
			stock: '66716',
			title:'Bút chì nhồi Shin: Kích thích cười ngay',
			salesNum: '22418',
			salesText: 'Đã bán trong 3 giờ gần đây',
			currency: 'RM',
			price: '0.89'
		}
	]
	return demo
	const productList = apiData?.data || []
	return productList.map((item) => {
		return {
			id: item.id,
			image: item.picture,
			stock: item.all_take_out,
			title: item.title,
			salesNum: item.three_take_out,
			salesText: `Đã bán 3 trong 3 giờ gần đây`,
			currency: 'RM',
			price: item.price
		}
	})
}