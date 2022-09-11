import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
  var isProd = mode === 'production';
  const isWatch = !isProd;
  console.log(process.env.buildWatch, isWatch)
  return {
    base: "./",
    // mode: mode, // 'development' 用于开发，'production' 用于构建
    build: {
      outDir: './dist',
      // assetsDir: 'assets',
      sourcemap: !isProd,
      chunkSizeWarningLimit: 20, // 20 KB
      watch: isWatch,
      rollupOptions: {
        input: {
          index: '/src/ts/index.ts',
        },
        // 用于排除不需要打包的依赖
        // external: ["react", "react-dom"],
        output: {
          // 需要在这里声明从全局查找的external的依赖中的变量名
          // globals: {
          //   "react": "react",
          //   "react-dom": "react-dom",
          // },
          //  chunk 包的文件名，默认 [name]-[hash].js
          chunkFileNames: '[name].js',
          // 定义 chunk 包的名 和规则
          manualChunks: (id, { getModuleInfo }) => {
            // console.log("manualChunks", id)

            // 打包jquery
            if (id.includes('node_modules/jquery')) {
              return  "vendor/" + id.toString().split('node_modules/')[1].split('/')[0].toString();
            }

            // 打包其他依赖
            if (id.includes('node_modules')) {
              // 每个依赖打包成一个文件
              // return "vendor/" + id.toString().split('node_modules/')[1].split('/')[0].toString()
              return 'vendor/vendor';
            }

            // 打包自己代码中 import 多次的模块
            const reg = /(.*)\/src\/(.*)/
            if (reg.test(id)) {
              const importersLen = getModuleInfo(id).importers.length;
              console.log(id, importersLen)
              // 被多处引用
              if (importersLen > 1) {
                return 'assets/common';
              }
            }
          },
          // 资源文件打包变量名， 默认值："assets/[name]-[hash][extname]"
          assetFileNames: (fileInfo) => {
            const fileName = fileInfo.name;
            // js 是entry，所以这里不会生效
            if (fileName.endsWith('.js') || fileName.endsWith('.ts')) {
              return `assets/js/[name].[ext]`
            }

            if (fileName.endsWith('.css')) {
              return `assets/css/[name].[ext]`
            }

            if (fileName.endsWith('.svg')
              || fileName.endsWith('.png')
              || fileName.endsWith('.jpg')
              || fileName.endsWith('.jpeg')
            ) {
              return `image/[name].[ext]`
            }

            if (fileName.endsWith('.ttf')
              || fileName.endsWith('.otf')
              || fileName.endsWith('.eot')
              || fileName.endsWith('.woff')
              || fileName.endsWith('.woff2')
            ) {
              return `font/[name].[ext]`
            }
            return `[ext]/[name].[ext]`
          },
          // 入口文件 input 配置所指向的文件包名 默认值："[name].js" 
          entryFileNames: (fileInfo) => {
            return 'assets/js/[name].js';
          },
        },
      },
    },
  }
}
)

