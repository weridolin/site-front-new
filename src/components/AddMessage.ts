import {
    ref,
    reactive,
    watch
} from 'vue'

import type {
    SiteCommentSubmitForm,
    SiteCommentResponse
} from 'src/services/apis/home'

import {HomeApi} from 'src/services/apis/home'



const propList = ref<Array<SiteCommentResponse>>([])
const messSub=ref(false)
const barrageIsShow = ref(true)
const currentId = ref(0)
const barrageLoop = ref(true)
const messList = ref<Array<Comment>>([])
const style = ["green", "red", "blue", "green", "yellow"]
const FormData = reactive<SiteCommentSubmitForm>({
    body:"",
    ip:"",
    address:"",
    name:"",
    email:"",
    qq:""
})


type Comment = {
    id:number,
    avatar:string,
    msg:string,
    time:number,
    barrageStyle:string
}

// watch
watch(propList,(value) => {
    // TODO check 后台返回的结构？
    let length = value.length;
    if (length <= 20) {
        let i = 0;
        if (value.length > 10) {
        i = Math.floor((value.length - 1) / 10) * 10;
        }
        for (i; i < length; i++) {
        messList.value.push({
            id: value[i].id,
            avatar: value[i].user
                ? value[i].user.profile.avator: "http://api.btstu.cn/sjtx/api.php?lx=c1&format=images",
            // TODO 显示emotion
            msg: value[i].body,
            // msg: this.list[i].body.replace(
            //   /\#[\u4E00-\u9FA5]{1,3}\;/gi,
            //   this.emotion
            // ),
            time: Math.ceil(Math.random() * 5 + 4),
            barrageStyle: style[Math.ceil(Math.random() * 4)],
        });
        }
    }
});

// method

function next(target:string){
    let toElement = document.querySelector(target);
    if (toElement!=null){
        toElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }
}

function emotion(res:string) {
    let word = res.replace(/\#|\;/gi, "");
    const list = [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "可爱",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极",
    ];
    let index = list.indexOf(word);
    return `![](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif)`;
}

async function submit(comment:SiteCommentSubmitForm){
    let res= await HomeApi.siteComment.submit(
        comment,
        {
            timeout:60*3*1000,
            showingLoading:true
            
        }
    )
    console.log(`提交评论结果 >>> ${res}`)
    return comment
}

export {
    FormData,
    messSub,
    barrageIsShow,
    currentId,
    barrageLoop,
    messList,
    style,
    propList,
    next,
    emotion,
    submit
}