import { ref } from 'vue';
import {HomeApi} from 'src/services/apis/home'
import type {
    SiteComment
} from 'src/services/apis/home'

const list = ref<Array<SiteComment>>([])
const current_page = ref(1)
const last_page=ref()
const loading= ref()
const count=ref()

function getMessList(){
    HomeApi.siteComment.getCommentList(
        {
            params:{
                "size":12,
                "page":current_page.value
            }
        }
    ).then(res=>{
			list.value = res.data.results
			console.log("get comments list success",list.value,res)
			last_page.value = res.data.last_page
			count.value = res.data.count
    }).catch(err=>{
				console.log("get comments list err",err)
		})

}

async function next(){

    if (current_page.value < last_page.value ){
        current_page.value+=1
    }
		
		await HomeApi.siteComment.getCommentList(
        {
            params:{
                "size":12,
                "page":current_page.value
            }
        }
    ).then(res=>{
			list.value = res.data.results
			console.log(">>> get comments list ",list.value)
			last_page.value = res.data.last_page
			count.value = res.data.count
		}).catch(err=>{
				console.log("get comments list error ",err)
		})

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