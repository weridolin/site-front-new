<template>
    <div class="link">
        <link-header></link-header>
        <link-friends-new :friends="friends" ></link-friends-new>
    </div>
</template>

<script setup lang="ts">
import LinkHeader from 'src/components/LinkHeader.vue'
import LinkFriendsNew from 'src/components/home/LinkFriendsNew.vue'

import {
    getFriends,
    friends
} from "src/pages/home/Link"
    
const initFriendLinks = async () => {
    await getFriends()
    console.log("获取友链列表",friends.value)
    return friends.value
}

initFriendLinks()


</script>
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