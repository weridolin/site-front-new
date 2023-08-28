import { ref,reactive,computed,defineEmits } from 'vue';
import {HomeApi} from 'src/services/apis/home'
import type {
    SiteCommentSubmitForm
} from 'src/services/apis/home'
// import { ElMessage } from 'element-plus';
// import { useAuthStore } from 'src/store/user';
// import { emit } from 'process';

const count = ref(0)
const loading =ref(false)
const commentSubmitFormData = reactive<SiteCommentSubmitForm>({
    body:"",
    name:"",
    qq:"",
    ip: "",
    address:"",  
    email:"" 
})


const show= ref(false)

const rules= {
    content: [
        {
            required: true,
            message: "还没填内容呢！^ω^",
            trigger: "blur,change",
        },
        { min: 1, max: 500, message: "内容3到500个字符", trigger: "blur" },
    ],
    name: [
        {
            required: true,
            message: "请留下名称！^ω^",
            trigger: "blur,change",
        },
        { min: 3, max: 10, message: "名称3到10 个字符", trigger: "blur" },
    ],
    qq: [
        {
            required: false,
            message: "请留下您的qq！^ω^",
            trigger: "blur,change",
        },
        { min: 3, max: 11, message: "qq号3到10 个字符", trigger: "blur" },
    ],
}


/** compute */
const countCount= computed(() => commentSubmitFormData.body.length)

const isLogin= computed(() => false) // TODO

const isToken= computed(() => true) // TODO


/** method  */
function handleEmotion(i:string) {
    commentSubmitFormData.body += i;
}

export function initCommentSubmitFormData(){
    commentSubmitFormData.body="",
    commentSubmitFormData.name="",
    commentSubmitFormData.qq="",
    commentSubmitFormData.ip="",
    commentSubmitFormData.address="",  
    commentSubmitFormData.email=""
}

  // 将匹配结果替换表情图片 TODO
function passcallback() {
    // this.ispass = true;
    return
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



export {

    show,
    count,
    commentSubmitFormData,
    rules,
    // post,
    isLogin,
    isToken,
    countCount,
    emotion,
    loading,
    handleEmotion
}