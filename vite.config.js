import {
    defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    build: {
        target: 'modules',
        outDir: 'dist', //指定输出路径
        assetsDir: 'assets', // 指定生成静态资源的存放路径
        minify: 'terser' // 混淆器，terser构建后文件体积更小
    },
    server: {
        cors: true, // 默认启用并允许任何源
        open: true, // 在服务器启动时自动在浏览器中打开应用程序
        //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
        proxy: {
            // '/api': {
            //     target: 'http://hb7faw.natappfree.cc',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api/, '')
            // }
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})