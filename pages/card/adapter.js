export const adaptProductList = (apiData = {}) => {
	const productList = apiData?.data || []

	return productList.map((item) => {
		return {
			id: item.id,
			image: item.picture,
			stock: item.all_take_out,
			title: item.title,
			salesNum: item.three_take_out,
			salesText: '',
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
			image: item.file?.show_src,
			link: item.open_url
		}
	})
}
