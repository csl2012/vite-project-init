import { defineConfig } from 'vite'
import { viteVConsole } from 'vite-plugin-vconsole'
import { pathResolve } from './vite.base.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // VConsole 调试工具配置
    viteVConsole({
      entry: pathResolve('src/main.js'), // 入口文件，或者可以使用这个配置: [path.resolve('src/main.js')]
      localEnabled: true, // 本地是否启用
      enabled: true, // 是否启用
      config: {
        maxLogNumber: 1000,
        theme: 'dark' // 主题颜色 'dark'|'light'
      }
    })
  ]
})
