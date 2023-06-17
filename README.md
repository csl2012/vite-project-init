# vite-project1

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

vue-create创建的vue3+vite项目，vue3+vite4+vue-router+pinia+axios+await-to-js+eslint+prettier+husky+lint-staged+commitlint
env区分环境, 非正式环境添加vconsole插件，按需导入组件，vue3使用ref,computed等composition api语法时，自动导入，不需要手动引入，svg组件
打包优化：
1、压缩css, js, 去除console, debugger
2、gzip压缩
3、cdn配置，自动插入index.html中
4、打包体积视图插件查看
5、legacy兼容配置
6、axios
7、unplugin-auto-import 配置ESlint报错问题
# https://xfxia.com/29480.html
eslint配置了回报错，引入了unplugin-auto-import自动引入
unplugin-auto-import插件中配置
eslintrc: {
    enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
    filepath: './.eslintrc-auto-import.json', // 生成json文件
    globalsPropValue: true,
},

.eslintrc.cjs中的extends引入'./.eslintrc-auto-import.json'