<script>
	import { getLocale, syncTabBarLocale } from './i18n'

	export default {
		onLaunch: function() {
			syncTabBarLocale(getLocale())
			console.log('App Launch')
		},
		onShow: function() {
			syncTabBarLocale(getLocale())
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 每个页面公共 css */
</style>
