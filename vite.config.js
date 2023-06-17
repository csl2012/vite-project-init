import { defineConfig, mergeConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteProdConfig from './vite.prod.config'
const envConfigResolver = (mode) => {
  const isProduction = mode.includes('production') // 多个环境打包时用
  return mergeConfig(viteBaseConfig, isProduction ? viteProdConfig : {})
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return envConfigResolver(mode)
})
