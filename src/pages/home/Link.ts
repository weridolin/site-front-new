
import { ref } from 'vue';
import {HomeApi} from 'src/services/apis/home'
import type {FriendsLink} from 'src/services/apis/home'



/** method */
const friends=ref<FriendsLink[]>([])


async function getFriends(){
    await HomeApi.friendLink.getFriendLinkList(
        {
            timeout:2*60*1000
        }
    ).then((res)=>{
        friends.value = res.data
        console.log(">>> 获取友链列表",res)
    }).catch((err)=>{
        console.log(">>> 获取友链列表失败",err)
    })    

}

export {
    getFriends,
    friends
}