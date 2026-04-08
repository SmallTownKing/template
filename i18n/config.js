export const I18N_STORAGE_KEY = 'APP_LOCALE'

export const DEFAULT_LOCALE = 'zh-Hans'

export const SUPPORTED_LOCALES = [
	{
		code: 'zh-Hans',
		label: '简体中文'
	},
	{
		code: 'en',
		label: 'English'
	},
	{
		code: 'vi',
		label: 'Tiếng Việt'
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
