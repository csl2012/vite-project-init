import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { pathResolve, createCdns, externalObject } from './vite.base.config'
const externalGlobalsObj = {
  vue: 'Vue',
  //   'vue-demi': 'VueDemi',
  'vue-router': 'VueRouter',
  // 'element-plus': 'ElementPlus',
  axios: 'axios'
}

const cdn = {
  css: [],
  js: [
    'https://unpkg.zhimg.com/vue@3.2.47/dist/vue.global.js',
    // 'https://unpkg.zhimg.com/vue-demi@0.14.5',
    'https://unpkg.zhimg.com/axios@1.4.0/dist/axios.min.js',
    'https://unpkg.zhimg.com/vue-router@4.1.6'
    // 'https://unpkg.zhimg.com/element-plus@2.3.3/dist/index.full.js',
  ]
}

export default defineConfig({
  base: '/vite-project-init',
  plugins: [
    visualizer({
      open: true,
      filename: '/dist/stats.html'
      //   gzipSize: true, // 收集 gzip 大小并将其显示
      //   brotliSize: true // 收集 brotli 大小并将其显示
    }),
    viteCompression({
      ext: '.gz',
      algorithm: 'gzip',
      deleteOriginFile: false,
      threshold: 10240 // 如果体积大于阈值，将被压缩，单位为b，体积过小请不要压缩，以免适得其反
    }),
    createCdns(cdn.css, cdn.js),
    externalObject(externalGlobalsObj)
  ],
  terserOptions: {
    compress: {
      drop_console: true,
      dorp_debugger: true
    }
  },
  build: {
    outDir: 'dist', // 输出路径
    sourcemap: false, // 是否生成 source map 文件， https://cn.vitejs.dev/config/build-options.html#build-sourcemap
    chunkSizeWarningLimit: 1500, // 触发警告的 chunk 大小
    assetsInlineLimit: 1024 * 5, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。默认：4kb
    modulePreload: {
      polyfill: true // 预加载
    },
    cssCodeSplit: true, // 拆分 CSS 代码
    rollupOptions: {
      input: {
        index: pathResolve('index.html')
      },
      // 指定生成的 chunk 被放置在哪个目录中，这里指定在 static/js/ 下，hash 值长度为10
      output: {
        chunkFileNames: 'static/js/[name]-[hash:10].prod.js', // 自定义命名代码分割中产生的 chunk
        entryFileNames: 'static/js/[name]-[hash:10].prod.js', // 指定 chunks 的入口文件模式
        assetFileNames: 'static/[ext]/[name]-[hash:10].prod.[ext]', // 自定义构建结果中的静态资源名称
        manualChunks(id) {
          // 让每个插件都打包成独立的文件 也可以全部集中打包到一起(直接返回vendor)
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      },
      external: Object.keys(externalGlobalsObj)
    }
  }
  //   css: {
  //     preprocessorOptions: {
  //       less: {
  //         // 修改 ant-design 主题及样式
  //         modifyVars: {
  //           hack: `true; @import '@/style/ant-design.less'; @import '@/style/canon-color.less'; @import '@/style/mixin.less';`
  //         },
  //         javascriptEnabled: true
  //       }
  //     }
  //   }
})
