import { ref,computed, reactive } from 'vue';
import type  {
    Profile
} from 'src/services/apis/auth'

export type Card = {
    pattern: boolean, //留言模式
    left: boolean, //left模式
}


const card= ref<Card>({
    pattern: false, //留言模式
    left: true, //left模式
})

const siteCommentList =ref({})

const open = ref(false)
const flicker =ref("0")
const pattern = ref("mess")

const id =ref(0)
const reply_id =ref(0)

const url =ref("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3656238279,115253853&fm=26&gp=0.jpg")
const boo = ref(false)

const replyFormData = reactive({
    mess_id: "",
    reply: "",
})

const userInfo = computed<Profile|any>(()=>{
    return {}
})

export type Address={
    loc_country:string;
    loc_province:string;
    loc_city:string
}


/*********************   method  *****************  */
function roll(target:string) {
    flicker.value = target;
    target = "#reply" + String(target);
    let toElement = document.querySelector(target);
    if( toElement !==null){
        toElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
        });
    }else{
        console.log(`can not find element`)
    }
}


function formatReply(address:Address) {
    
    // console.log(adds)
    let country  = address.loc_country;
    let province = address.loc_province;
    let city = address.loc_city;

    return country+'<span style="margin: 0 2px;">•</span>'+province + '<span style="margin: 0 2px;">•</span>' + city;
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
// function reply(_id:number) {
//     reply_id.value = 0;
//     if (id.value == _id && pattern.value == "mess") {
//         id.value = 0;
//     } else {
//         id.value = _id;
//         pattern.value = "mess";
//     }
//     }

  // 回复id
// function  replyMess(_id:number, mess_id:number, mess_reply_id:number) {
//     if (reply_id.value == _id) {
//         reply_id.value = 0;
//         mess_reply_id.value = 0;
//     } else {
//         pattern.value = "reply";
//         id.value = mess_id;
//         reply_id.value = id;
//         console.log(name);
//         this.mess_reply_id = mess_reply_id;
//     }
// }
  // 回复评论
// fucntion  replyComment(comment) {
//     if (this.reply_id) {
//       this.FormData.mess_reply_id = this.reply_id;
//     } else {
//       delete this.FormData.mess_reply_id;
//     }
//     this.FormData.reply = comment.content;
//     this.FormData.mess_id = this.id;
//     this.FormData.ip = comment.ip;
//     this.FormData.address = comment.address;
//     let that = this;
//     this.$post("/apis/user/reply/add", this.FormData)
//       .then(function (res) {
//         that.$emit("submit");
//         that.$message({
//           showClose: true,
//           message: res.message,
//           type: "success",
//         });
//       })
//       .catch(function (error) {});
//   },
function  deleteComment(_id:number, type:string) {
    console.log(">>>todo ....")
}
// async function post() {
//     // this.comment.type = "siteComment";
//     let res = await HomeApi.siteComment.submit(
//         commentSubmitFormData,
//         {
//             showingLoading:true,
//             timeout:2*60
//         }
//     )
//     console.log(`>>> 提交网站留言结果${res}`)
// }

function setColor() {
    let r = Math.random() * 256;
    let g = Math.random() * 256;
    let b = Math.random() * 256;
    return `rgba(${r},${g},${b},0.3)`;
}


function getDateDiff(dateTimeStamp:number) {
    // 原来： dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi, "/"));
    // dateTimeStamp = Date.parse(dateTimeStamp);
    let minute = 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;

    // 这里的时间戳是毫秒级
    let now = new Date().getTime();
    let diffValue = now / 1000 - dateTimeStamp;
    if (diffValue < 0) {
        return;
    }
    console.log(now, dateTimeStamp, diffValue);
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    let result = "";
    if (monthC >= 1) {
        result = "" + parseInt(String(monthC)) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(String(weekC)) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(String(dayC)) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(String(hourC)) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(String(minC)) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
    }



export {
    open,
    flicker,
    pattern,
    id,
    reply_id,
    url,
    boo,
    replyFormData,
    userInfo,
    getDateDiff,
    setColor,
    card,
    siteCommentList,
    formatReply,
    deleteComment
    // replyMess
}

