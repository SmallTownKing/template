export const I18N_STORAGE_KEY = 'APP_LOCALE'

export const DEFAULT_LOCALE = 'zh-Hans'

export const SUPPORTED_LOCALES = [
	{
		code: 'zh-Hans',
		label: '\u7b80\u4f53\u4e2d\u6587'
	},
	{
		code: 'en',
		label: 'English'
	},
	{
		code: 'vi',
		label: 'Ti\u1ebfng Vi\u1ec7t'
	}
]

export const TABBAR_I18N_ITEMS = [
	{
		index: 0,
		pagePath: 'pages/index/index',
		key: 'tabbar_001',
		fallback: '\u6e38\u620f'
	},
	{
		index: 1,
		pagePath: 'pages/card-release/index',
		key: 'tabbar_002',
		fallback: '\u5361\u724c'
	},
	{
		index: 2,
		pagePath: 'pages/market/index',
		key: 'tabbar_003',
		fallback: '\u96c6\u5e02'
	},
	{
		index: 3,
		pagePath: 'pages/warehouse/index',
		key: 'tabbar_004',
		fallback: '\u4ed3\u5e93'
	},
	{
		index: 4,
		pagePath: 'pages/user-center/index',
		key: 'tabbar_005',
		fallback: '\u6211\u7684'
	}
]

export const LOCALE_ALIASES = {
	zh: 'zh-Hans',
	'zh-CN': 'zh-Hans',
	zh_CN: 'zh-Hans',
	'en-US': 'en',
	en_US: 'en',
	'vi-VN': 'vi',
	vi_VN: 'vi'
}
