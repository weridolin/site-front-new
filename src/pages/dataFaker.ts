import { ElMessage } from 'element-plus'
import { ref,reactive } from 'vue'
import {dataFakerApis} from 'src/services/apis/dataFaker'
import { CONFIG } from 'src/config'

const formLabelWidth =ref("120px")

const downForm = reactive({
    down_code:"",
    down_fileName:""
})

const dataCount= ref(100)//生成数据条数
var ws_conn:WebSocket

// ws消息类型
export enum WSType {
    "start" = 1,  //开始生成
    "stop" = 2,  // 停止生成
    "progress" = 3, //生成进度
    "finish" = 4, // 结束生成
    "error" = 5      // 用户重命名
}


interface WSMessage {
    "type":WSType,
    "data":any,
    "record_key":string
}  



// 动态表单
interface Item {
    id:string,
    alias:string,
    type:string,
    name:string,
    generator:string,
    condition:any[]
}

interface dynamicValidateFormT {
    items:Item[]
}

const dynamicValidateForm=reactive<dynamicValidateFormT>({
    items: [{
        id:"",
        alias:"",
        type:"",
        name:"",
        generator:"",
        condition:[]
    }],
})



// import type { FormInstance } from 'element-plus'

// const formRef = ref<FormInstance>()
// const dynamicValidateForm = reactive<{
//   domains: DomainItem[]
//   email: string
// }>({
//   domains: [
//     {
//       key: 1,
//       value: '',
//     },
//   ],
//   email: '',
// })

// interface DomainItem {
//   key: number
//   value: string
// }


// 下拉选择框
const options =ref([
    {
        "type":"int",
        "alias":"整形",
        "name":"整形字段1",
        "generator":"IntGenerator",
        "condition":[
            {   
                "front_type":"input",
                "type":"min",
                "value":null,
                "alias":"最小值"
            }, 
            {
                "front_type":"input",
                "type":"max",
                "value":null,
                "alias":"最大值"
            },
            {
                "front_type":"bool",
                "type":"only_positive",
                "value":null,
                "alias":"只为正值"
            },
            {
                "front_type":"bool",
                "type":"only_negative",
                "value":null,
                "alias":"只为负值"
            }]
    },
    {
        "type":"mail",
        "alias":"邮箱",
        "name":"邮箱字段1",
        "generator":"MailGenerator",
                "condition":[]
    },
    {
        "type":"IP4",
        "alias":"IP4",
        "name":"IP4字段1",
        "generator":"IP4Generator",
        "condition":[]
    },
    {
        "type":"IP6",
        "alias":"IP6",
        "name":"IP6字段1",
        "generator":"IP6Generator",
        "condition":[]
    },
    {
        "type":"address",
        "alias":"地址",
        "name":"地址字段1",
        "generator":"AddressGenerator",
        "condition":[]
    },
    {
        "type":"age",
        "alias":"年龄",
        "generator":"AgeGenerator",
        "condition":[
            {
                "front_type":"input",
                "type":"min",
                "value":null,
                "alias":"最小值"
            }, 
            {
                "front_type":"input",
                "type":"max",
                "value":null,
                "alias":"最大值"
            }
        ] 
    },
    {
        "type":"gender",
        "name":"性别字段1",
        "generator":"GenderGenerator",
        "condition":[],
        "alias":"性别"
    },
    {   
        "type":"phone",
        "alias":"电话",
        "name":"电话字段1",
        "generator":"PhoneNumberGenerator",
        "condition":[
            {
                "front_type":"select",
                "select_options":[],
                "type":"region",
                "value":null,
                "alias":"区号"
            }
        ]
    },
    {
        "type":"telephone",
        "name":"手机电话字段1",
        "generator":"TelePhoneGenerator",
        "alias":"手机电话号码",
        "condition":[]
    },
    {
        "location":"location",
        "name":"所在地字段1",
        "generator":"LocationGenerator",
        "alias":"所在地",
        "condition":[{
                "front_type":"select",
                "select_options":[],
                "type":"options",
                "value":null,
                "alias":"枚举值"
            
        }]
    },
    {   
        "type":"pay",
        "name":"金额字段1",
        "generator":"PayGenerator",
        "alias":"金额",
        "condition":[
            {
                "front_type":"input",
                "type":"min",
                "value":null,
                "alias":"最小值"
            },
            {
                "front_type":"input",
                "type":"max",
                "value":null,
                "alias":"最大值"
            },
            {
                "front_type":"input",
                "type":"precision",
                "value":null,
                "alias":"精度"
            }
        ]
    }
])


const temp = reactive({ //用于存放暂时选择的字段类型
    type:null,
    // condition:null,
})

const key=ref("Test") //POST请求后得到的KEY

// const ws_conn:object = null
const progress_percent =ref(0)

const state = reactive({
    loading:false,
    loadingText:"正在获取文件下载码",
    is_generating:false //是否正在生成数据
})

const ws_url:string = ""



/** method                                  */

function build_conn(){
    let ws_url = "ws://127.0.0.1:8000"
    // HTMLFormControlsCollection
    if (process.env.NODE_ENV == "production"){
        ws_url = "wss://www.weridolin.cn"  // another way
    }
    console.log(">>>>>>>>ws url",ws_url,process.env.NODE_ENV )
    ws_conn = new WebSocket(`${ws_url}/ws/dataFaker/${key.value}`)
    ws_conn.onmessage = function(event) {
        console.log("get message from ws server >>>",event.data);
        handleWsData(event.data)
    }
    ws_conn.onopen = function(event) {
        console.log("ws successfully connect to server",event)
        const payload = {
            "type":1,
            "record_key":key.value
        }
        console.log(">>> ws send message",payload)
        ws_conn.send(JSON.stringify(payload))
    }
    ws_conn.onerror = function(event){
        state.is_generating=false
        console.log("ws on error",event)
        console.log("an error raise an in ws")
    }
}

// function submitForm(formName) {
//     $refs[formName].validate((valid) => {
//         if (valid) {
//             alert('submit!');
//         } else {
//         console.log('error submit!!');
//             return false;
//         }
// });
// }

function resetForm(domain:Item) {
    // this.$refs[formName].resetFields();
    console.log("reset form fields",domain)
    domain.name = ""
    domain.alias = ""
    domain.condition = []
    domain.id=""
    domain.type=""
    domain.generator=""
    domain.condition=[]
}
    // domain.condition.forEach(condition => {
    //     condition.value=""
    // });

function removeDomain(item:Item) {
    var index = dynamicValidateForm.items.indexOf(item)
    if (index !== -1) {
        dynamicValidateForm.items.splice(index, 1)
    }
}
function addDomain() {
    dynamicValidateForm.items.push({
            id:"", 
            alias:"",
            type:"",
            name:"",
            generator:"",
            condition:[
                
            ]
        });
}
function selectItem(domain:Item){
    let condition = getConditionByAlias(domain)
    // domain.condition = deepClone(condition)
    console.log(">>> get domain condition",condition)
    domain.condition = JSON.parse(JSON.stringify(condition)) //深拷贝
    // Object.assign(domain.condition,condition)
    domain.generator = getGeneratorByAlias(domain)
    console.log("select item,generate and add condition",dynamicValidateForm)
}

// function deepClone(obj:any){ 
//     //深拷贝
//     let objClone =  Array.isArray(obj) ? [] : {};
//     if (obj && typeof obj === 'object') {
//     for(let key in obj){
//         if (obj[key] && typeof obj[key] === 'object'){
//             objClone[key] = deepClone(obj[key]);
//         }else{
//             objClone[key] = obj[key]
//         }
//     }
//     }
//     return objClone;
// }
function getConditionByAlias(domain:Item){
    let res:any[] =[]
    options.value.forEach(element => {
        if (element.alias==domain.alias){
            console.log(">>get condition",element.condition)
            // domain.condition = domain.condition.concat(element.condition)
            res = element.condition
        }
    });
    return res
}
function getGeneratorByAlias(domain:Item){
    let res :string= ""
    options.value.forEach(element => {
        if (element.alias==domain.alias){
            console.log(">>get generator",element.generator)
            // domain.condition = domain.condition.concat(element.condition)
            res = element.generator
        }
    });
    return res
}

function getFileInfoByDownCode(){
    if(downForm.down_code.length==6){
        let res = dataFakerApis.getFileInfoByDownCode(downForm.down_code)
        res.then(function (res) {
            console.log(res,"GET FAKER FILE INFO BY DOWN CODE",res);
            if (res.code == 0){
                // console.log(document.querySelector(".downFile"))
                let downFileEle = document.querySelector(".downFile")
                if (downFileEle){
                    downFileEle.textContent = `${res.data.record_key}.csv`
                }else{
                    console.log(">>> can not find downFile element")
                }
                let expireTimeEle =  document.querySelector(".expire-time")
                if (expireTimeEle){
                    expireTimeEle.textContent = compute(res.data.timedelta)
                }
                }
            })
            .catch(function (error) {
                console.log("(dataFaker) get down file info by downCode",error)
            });
    } else {
        let downFileEle = document.querySelector(".downFile")
        if (downFileEle){
            downFileEle.textContent = ``
        }else{
            console.log(">>> can not find downFile element")
        }
        let expireTimeEle =  document.querySelector(".expire-time")
        if (expireTimeEle){
            expireTimeEle.textContent = ""
        }
        }
        // this.downForm.down_fileName = ""
}

function initInfo(){
    if (state.is_generating){
        ElMessage({
            message: '当前有数据生在生成,请耐心等待其生成完成!',
            type: 'error'
        });
        return
    }
    if (parseInt(dataCount.value.toString())>100000){
        ElMessage({
            message: '资源问题暂时最多一次性只支持10W条😂',
            type: 'error'
        });
        return
    }
    const data = {
        "fields":dynamicValidateForm.items,
        "count":dataCount.value
    }  
    // 开始生成数据/
    dataFakerApis.initDataInfo(data,{
        timeout:2*69*1000
    }).then(function (res) {
        //  {
        // "key": "879baf8bbdee4f06adbc7c3cbb9581c9",
        // "is_exist": false
        // }
        state.is_generating=true
        console.log(res,"GET FILE UPLOAD INFO");
        if (res.data.is_exist){
            console.log(">>> is already exist!" ,res)
        }else{
            key.value = res.data.key  
            build_conn() 
            startGenerateFakeData()
        }
    })
    .catch(function (error) {
        state.is_generating = false
        console.log(">>> init data faker info error",error)
    });
}

function startGenerateFakeData(){
    const payload = {
        "type":1,
        "record_key":key.value
    }
    console.log(">>> ws send message",payload)
    ws_conn.send(JSON.stringify(payload))
}

function downFile(){
    if( downForm.down_code==""||downForm.down_code==null || downForm.down_code.length!=6){
        ElMessage({
            message: '授权码非法',
            type: 'error'
        });
        return
    }
    // let that = this
    // const downCode = this.downForm.down_code
    const el = document.createElement('a');
    el.style.display = 'none';
    el.setAttribute('target', '_blank');
    // console.log(">>>>",process.env.VITE_API_HOST)
/**
     * download的属性是HTML5新增的属性
     * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
     * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
     * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
     */  

    if (process.env.NODE_ENV == "production"){
        el.href =`http://127.0.0.1:8000/api/v1/dataFaker?download_code=${downForm.down_code}`;
    }
    downForm.down_fileName && el.setAttribute('download', downForm.down_fileName);
    el.href =`${CONFIG.API_HOST}/api/v1/dataFaker?download_code=${downForm.down_code}`;
    console.log(el);
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}
function handleWsData(data:string){
        // start = 1
        // stop = 2
        // progress = 3
        // finish = 4
        // error = 5
    const _data:WSMessage = JSON.parse(data)
    switch (_data.type) {
        case 3:
            { 
                progress_percent.value = _data.data.progress
                state.is_generating = true
                break
            };
        case 4:
            {   
                state.is_generating = false
                downForm.down_code = _data.data.download_code
                console.log(">>>>",downForm.down_code)
                getFileInfoByDownCode()
                ws_conn.close()
                break
            };
        default:
            break;
    }
}
function compute(timestamps:number){
    var secondTime = Math.abs(timestamps);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时

    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt((secondTime / 60).toString());
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt((secondTime % 60).toString());
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt((minuteTime / 60).toString());
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt((minuteTime % 60).toString());
        }
    }
    var time = "" + parseInt(secondTime.toString()) + "秒";
    if(minuteTime > 0) {
        time = "" + parseInt(minuteTime.toString()) + "分" + time;
    }
    if(hourTime > 0) {
        time = "" + parseInt(hourTime.toString()) + "小时" + time;
    }
    if (timestamps<0){
        console.log(time)
        return  "已过期 "  + time
    } else {
        return time+"  后过期"
    }
}



export {
    formLabelWidth,
    downForm,
    dataCount,
    dynamicValidateForm,
    options,
    temp,
    key,
    progress_percent,
    state,
    build_conn,
    resetForm,
    removeDomain,
    selectItem,
    addDomain,
    initInfo,
    startGenerateFakeData,
    getFileInfoByDownCode,
    downFile,
}