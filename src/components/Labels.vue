<template>
    <div  v-loading="loading">
        <router-link :to="'/blog?label='+item" class="label blog-animation"  v-for="(item,key) of label" :key="key" :style="{background:color}">
            {{item}}
        </router-link>
    </div>
</template>
<script>
export default {
    name:'Labels',
    data(){
        return {
            label:{},
            color:'',
            loading:false
        }
       
    },
    methods:{
        setColor(){
                let r = parseInt(Math.random() * 256)
                let g = parseInt(Math.random() * 256)
                let b = parseInt(Math.random() * 256)
                this.color = `rgba(${r},${g},${b},0.3)`
        },
        getLabel(){
            let that=this
            this.loading=true
            that.$post('/apis/label/list')
            .then(function(res){
                that.label=res.data
                that.loading=false
            })
            .catch(function(error){
                that.loading=false
            })
        }
    },
    created(){
        this.getLabel()
        this.setColor()
    }
}
</script>
<style lang="stylus" scoped>
    .label
        margin:4px
        display:inline-block
        height 20px
        padding:0 15px
        border:1px solid #ccc
        text-align center
        line-height 20px
        color:#fff
        font-size 12px
        box-shadow:1px 1px 1px #ccc
        border-radius:15px
        transition:all .3s
        cursor:pointer
    .label:hover
        box-shadow:2px 2px 2px #ccc
        border:1px solid #fff

</style>