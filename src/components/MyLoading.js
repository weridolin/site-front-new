import Loading from './NewLoading.vue'
// 这里是重点
const MyLoading = {
    install: function(Vue) {
        Vue.component('MyLoading', Loading)
    },
}

// 导出组件
export default MyLoading