import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import analyzer from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  // base:"/",
  root:"./",
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    analyzer({ summaryOnly: true }),
  ],
  // build: {
  //   outDir: './dist/'
  // }
  // ******开发服务器配置******
  server: {
      https: false, //(使用https)启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS
      host: "127.0.0.1", 
      port: 3000, //指定开发服务器端口：默认3000
      open: false, //启动时自动在浏览器中打开
      cors: true, //为开发服务器配置 CORS
      proxy: {
        //配置自定义代理规则
        // 字符串简写写法
        // '/': {
        //   target: 'http://127.0.0.1:8000/',
        //   changeOrigin: true, //是否跨域
        //   rewrite: path => path
        // }
        '/gpt': { // 这里的'/api'是匹配的路由前缀
          target: 'http://127.0.0.1:8000', // 目标代理服务器地址
          changeOrigin: true, // 是否允许跨域  
          // rewrite: (path) => path, // 
        },
        '/sse': { // 这里的'/api'是匹配的路由前缀
          target: 'http://127.0.0.1:8000', // 目标代理服务器地址
          changeOrigin: true, // 是否允许跨域  
          rewrite: (path) => path, // 重写路径，去掉/api前缀
        },
      }
      // hmr: {
      //   overlay: false
      // }
  },
})
