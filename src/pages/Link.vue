<!--
 * @Description: 
 * @email: 359066432@qq.com
 * @Author: lhj
 * @software: vscode
 * @Date: 2021-10-02 16:28:06
 * @platform: windows 10
 * @LastEditors: lhj
 * @LastEditTime: 2021-10-05 16:48:10
-->
<template>
    <div class="link">
        <link-header></link-header>
        <link-friends-new :friends="friends" ></link-friends-new>
    </div>
</template>

<script setup lang="ts">
    import LinkHeader from 'src/components/LinkHeader.vue'
    import LinkFriendsNew from 'src/components/LinkFriendsNew.vue'

    import {
        getFriends,
        friends
    } from "src/pages/Link"
        
    const initFriendLinks = async () => {
        await getFriends()
        console.log("获取友链列表",friends.value)
        return friends.value
    }

    initFriendLinks()




</script>

<!-- 
<script>
import LinkHeader from '../components/LinkHeader'
import LinkFriends from '../components/LinkFriends'
import LinkFriendsNew from '../components/LinkFriendsNew'


export default {
    name:'Link',
    components:{
        LinkHeader,
        LinkFriends,
        LinkFriendsNew,
        
    },
    data(){
        return {
            friends:[]
        }
    },
    methods:{
       getFriends(){
            let that=this
            // that.$get('http://127.0.0.1:8000/api/v1/blogs/friendslinks')
            that.$get('/api/v1/home/friendslinks')
            .then(function (response) {
                 console.log("get friendslink",response)
                 that.friends=response.data
            })
            .catch(function (error) {
                console.log(error.data);
            });
        }
    },
    created(){
        this.getFriends()
    }
}
</script> -->
<style lang="stylus" scoped>
    .link
        background-color #fff
        .link-bg
            position:fixed
            top:0
            right:0
            bottom:0
            left:0
            margin:auto
            z-index:-1
</style>