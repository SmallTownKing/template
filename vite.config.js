import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, __dirname, '')
	const proxyPrefix = env.VITE_H5_PROXY_PREFIX || '/dev-api'
	const proxyTarget = env.VITE_H5_PROXY_TARGET || env.VITE_API_BASE_TEST || ''
	const proxyEnabled = String(env.VITE_H5_PROXY_ENABLED || 'true').toLowerCase() === 'true'

	const server = {}

	if (proxyEnabled && proxyTarget) {
		server.proxy = {
			[proxyPrefix]: {
				target: proxyTarget,
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(proxyPrefix, '/api')
			}
		}
	}

	return {
		plugins: [uni()],
		server
	}
})
