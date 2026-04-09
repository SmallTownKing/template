import { createPinia } from 'pinia'
import { piniaPersistPlugin } from './plugins/persist'

const pinia = createPinia()

pinia.use(piniaPersistPlugin)

export * from './modules/app'
export { pinia }
export default pinia
