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


export const adaptScheduleBanner = (apiData = {}) => {
	const demo = [
		{
			id: 1,
			image: 'https://img.showgo.gg/brand/images/20260110/083c710596a74eed9945b0bf1b1b336f.webp'
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