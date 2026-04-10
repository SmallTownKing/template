const createWarehouseGoods = () => {
	return Array.from({ length: 9 }).map((_, index) => {
		return {
			id: `warehouse-card-${index + 1}`,
			title: 'Vũ khí Nguyên tố, phiên bản giới hạn',
			image: '/static/images/warehouse-card-kitty.svg',
			badge: 'SP',
			stockLabel: 'x3',
			availableCount: 3,
			selectedCount: index === 0 ? 2 : 0,
			displayPrice: 'RM4,050.00',
			unitPrice: 0.445,
			rewardTag: index === 5 ? 'Nhận thưởng tăng x3' : ''
		}
	})
}

export const createWarehousePageMock = () => {
	return {
		title: 'Kho của tôi',
		notice:
			'Tất cả sản phẩm, quà tặng, đồ chơi và thẻ bài đều được cấp phép chính thức từ nhà phân phối chính hãng, đảm bảo chất lượng.',
		tabs: [
			{
				id: 'game',
				label: 'Trò chơi'
			},
			{
				id: 'card',
				label: 'Thẻ bài'
			}
		],
		vault: {
			label: 'Thùng bảo mật',
			count: 0
		},
		emptyState: {
			image: '/static/images/warehouse-empty-panda.svg',
			text: 'Kho trống rỗng như không~'
		},
		goodsMap: {
			game: [],
			card: createWarehouseGoods()
		}
	}
}

export default createWarehousePageMock
