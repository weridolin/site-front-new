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
        '/home': {
          target: 'http://127.0.0.1:80/',
          changeOrigin: true, //是否跨域
          rewrite: path => path
        }
      }
      // hmr: {
      //   overlay: false
      // }
  }
})
