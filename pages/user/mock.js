export const createUserCenterMock = () => {
	return {
		member: {
			name: 'XGYHJ00265',
			avatar: '',
			avatarText: 'XY',
			userId: '10396982',
			following: 0,
			fans: 0,
			vipLevel: 2,
			progress: 0.2,
			progressHint: '20XP \u5347\u7ea7\u4e2d',
			currentExpText: '79XP',
			targetExpText: '99XP',
			balanceCurrency: 'vnd',
			balance: '42.60',
			pointsValue: '0.00',
			pointsApprox: '(~RM0.00)',
			integral: '0.00'
		},
		guest: {
			name: '\u767b\u5f55\u6216\u6ce8\u518c',
			avatar: '',
			avatarText: 'PB',
			inviteTitle: '\u52a0\u5165 PANDA BREAKS',
			inviteDesc: '\u53ea\u9700\u4e00\u6b21\u53c2\u4e0e\u5c31\u53ef\u4ee5\u89e3\u9501\u66f4\u591a\u4f1a\u5458\u6743\u76ca'
		},
		assets: {
			balanceLabel: '\u4f59\u989d',
			withdrawText: '\u63d0\u73b0',
			rechargeText: '\u5145\u503c',
			currency: 'vnd'
		},
		benefits: {
			leftTitle: '\u6211\u7684\u670b\u53cb',
			leftDesc: '\u70b9\u51fb\u67e5\u770b\u9080\u8bf7\u5956\u52b1',
			rightTitle: '\u79ef\u5206\u4f59\u989d',
			redeemText: '\u5151\u6362'
		},
		features: {
			title: '\u66f4\u591a\u529f\u80fd',
			actionText: '\u522e\u522e\u4e50\u5151\u5956',
			items: [
				{ key: 'record', label: '\u8bb0\u5f55', iconText: '\u8bb0', path: '/pages/home/Boxrecord/index', auth: true },
				{ key: 'order', label: '\u8ba2\u5355', iconText: '\u5355', path: '/pages/public/order/index?index=0', auth: true },
				{ key: 'coupon', label: '\u4f18\u60e0\u5238', iconText: '\u5238', path: '/pages/public/Coupon/index', auth: true },
				{ key: 'notice', label: '\u901a\u77e5', iconText: '\u901a', path: '/pages/noticeList/index', auth: true },
				{ key: 'redeem', label: '\u5151\u6362\u7801', iconText: '\u5151', path: '/pages/public/exchange/index', auth: true },
				{ key: 'address', label: '\u5730\u5740', iconText: '\u5730', path: '/pages/public/address/index', auth: true },
				{ key: 'service', label: '\u5ba2\u670d', iconText: '\u5ba2', path: '/pages/public/Article/customerService', auth: false },
				{ key: 'settings', label: '\u8bbe\u7f6e', iconText: '\u8bbe', path: '/pages/public/userinfo/index', auth: false }
			]
		}
	}
}
