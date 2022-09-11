import { defineConfig } from 'vite'



export default defineConfig(({ command, mode }) => {
  // console.log(command, mode);
  const isWatch = process.env.buildWatch?.trim() === "true";
  console.log(process.env.buildWatch, isWatch)
  return {
    build: {
      outDir: './dist',
      assetsDir: 'assets',
      sourcemap: false,
      chunkSizeWarningLimit: 20, // 20 KB
      watch: isWatch,
      rollupOptions: {
        input: {
          main: '/src/main.ts',
        },
        // external: ["react", "react-dom"],
        output: {
          // globals: {
          //   "react": "react",
          //   "react-dom": "react-dom",
          // },
          manualChunks: (id) => {
            // console.log("manualChunks", id)
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
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
            return `[ext]/[name].[ext]`
          },
          entryFileNames: (f) => {
            return 'assets/js/[name].js';
          },
        },
      },
    },
  }
}
)

