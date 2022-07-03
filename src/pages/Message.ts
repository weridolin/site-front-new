import { ref } from 'vue';
import {HomeApi} from 'src/services/apis/home'
import type {
    SiteCommentResponsePagination,
    SiteCommentResponse
} from 'src/services/apis/home'

const list = ref<Array<SiteCommentResponse>>([])
const current_page = ref(1)
const last_page=ref()
const loading= ref()
const count=ref()



async function getMessList(){
    let res:SiteCommentResponsePagination = await HomeApi.siteComment.getCommentList(
        {
            params:{
                "size":12,
                "page":current_page.value
            }
        }
    )
    list.value = res.results
    console.log(">>> get comments list >>>> ",list.value)
    last_page.value = res.last_page
    count.value = res.count
}

async function next(){

    if (current_page.value < last_page.value ){
        current_page.value+=1
    }

    let res:SiteCommentResponsePagination = await HomeApi.siteComment.getCommentList(
        {
            params:{
                "size":12,
                "page":current_page.value
            }
        }
    )
    list.value = res.results
    console.log(">>> get comments list >>>> ",list.value)
    last_page.value = res.last_page
    count.value = res.count
    return 
}


export {
    list,
    current_page,
    last_page,
    loading,
    count,
    getMessList,
    next,
}