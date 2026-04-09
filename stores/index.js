import { createPinia } from 'pinia'
import { piniaPersistPlugin } from './plugins/persist'

const pinia = createPinia()

pinia.use(piniaPersistPlugin)

export * from './modules/app'
export * from './modules/auth-popup'
export { pinia }
export default pinia
