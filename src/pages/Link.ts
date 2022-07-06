
import { ref } from 'vue';
import {HomeApi} from 'src/services/apis/home'
import type {FriendsLink} from 'src/services/apis/home'



/** method */
const friends=ref<FriendsLink[]>([])


async function getFriends(){
    let res = await HomeApi.friendLink.getFriendLinkList(
        {
            timeout:2*60*1000
        }
    )
    console.log(">>> 获取友链列表",res)
    friends.value = res.data

}


export {
    getFriends,
    friends
}