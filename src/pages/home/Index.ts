import {HomeApi} from 'src/services/apis/home'
import { ref } from 'vue';

function hello(){
    let content="H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,m,y,&nbsp, s,i,t,e."
    return content.split(",");
}

export interface CarouselBackGroundImage {
    id:string,
    title:string,
    info:string,
    link:string,
    img_url:string
}

export const imageList = ref<CarouselBackGroundImage[]>([
    {
      id: "1",
      title: "werido",
      info:
        "H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,b,l,o,g.",
      link: "www.baidu.com",
      img_url:new URL('../../../src/assets/site/bg1.jpg',import.meta.url).href,
      // img_url:bg1,
    },
    {
      id: "2",
      title: "werido",
      info:
        "H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,b,l,o,g.",
      link: "www.baidu.com",
      img_url:new URL('../../../src/assets/site/bg2.jpg',import.meta.url).href,  
      // img_url:bg2,  
    },
    {
      id: "3",
      title: "werido",
      info:
        "H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,b,l,o,g.",
      link: "www.baidu.com",
      img_url:new URL('../../../src/assets/site/bg3.jpg',import.meta.url).href,  
      // img_url:bg3  
    },
]
)

export  function getBackGroundImages(){
    HomeApi.background.getBackgroundImageList(
        {
            timeout:2*60*1000
        }
    ).then((res)=>{
        for (let element of res.data) {
          imageList.value.push({
            id: element.id.toString(),
            title: "werido",
            info: "H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,b,l,o,g.",
            link: "www.baidu.com",
            img_url:new URL(`../../../src/assets/site/${element.url}`, import.meta.url).href,
          })
        }
        console.log(">>> 获取背景图片列表",res.data)
    }).catch((err)=>{
      console.log(">>> 获取背景图片列表失败",err)
    })
}

export {
    hello
}
