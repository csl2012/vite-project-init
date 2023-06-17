import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
// import Components from "unplugin-vue-components/vite";
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import externalGlobals from 'rollup-plugin-external-globals'
// import viteImagemin from 'vite-plugin-imagemin'
// import {
//   AntDesignVueResolver,
//   ElementPlusResolver,
//   VantResolver,
// } from 'unplugin-vue-components/resolvers'

export function pathResolve(path) {
  return resolve(process.cwd(), path) // process.cwd() | __dirname
}

export function createCdns(cdnCss = [], cdnJs = []) {
  return createHtmlPlugin({
    inject: {
      data: {
        cdnCss,
        cdnJs
      }
    }
  })
}

export function externalObject(obj = {}) {
  return {
    ...externalGlobals(obj),
    enforce: 'post',
    apply: 'build'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-project-init/', // 开发或生产环境服务的公共基础路径
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    AutoImport({
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: './.eslintrc-auto-import.json', // 生成json文件
        globalsPropValue: true
      },
      include: [
        /\.js$/, // .ts, .tsx, .js, .jsx
        /\.vue$/
      ],
      imports: [
        'vue',
        'vue-router'
        // custom
        // {
        //   '@vueuse/core': [
        //     // named imports
        //     'useMouse', // import { useMouse } from '@vueuse/core',
        //     // alias
        //     ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
        //   ],
        //   axios: [
        //     // default imports
        //     ['default', 'axios'] // import { default as axios } from 'axios',
        //   ],
        //   '[package-name]': [
        //     '[import-names]',
        //     // alias
        //     ['[from]', '[alias]']
        //   ]
        // },
        // // example type import
        // {
        //   from: 'vue-router',
        //   imports: ['RouteLocationRaw'],
        //   type: true
        // }
      ]
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [pathResolve('src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
      // svgoOptions: {
      //   // 删除一些填充的属性
      //   plugins: [
      //     {
      //       name: "removeAttrs",
      //       params: { attrs: ["class", "data-name", "fill", "stroke"] },
      //     },
      //     // 删除样式标签
      //     "removeStyleElement",
      //   ],
      // },
    }),
    createCdns(),
    externalObject()
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false,
    //   },
    //   optipng: {
    //     optimizationLevel: 7,
    //   },
    //   mozjpeg: {
    //     quality: 20,
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox',
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false,
    //       },
    //     ],
    //   },
    // }),
    // Components({
    //   resolvers: [
    //     AntDesignVueResolver(),
    //     ElementPlusResolver(),
    //     VantResolver(),
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: '5175',
    host: true,
    open: true,
    cors: true,
    proxy: {}
  }
})
