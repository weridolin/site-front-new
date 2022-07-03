<template>
    <div class="marked">
        <div ref="preview" class="write">
            <span
                v-if="dompurify"
                v-dompurify-html="html"
            ></span>
            <span
                v-else
                v-html="html"
            ></span>
        <el-image 
            v-if="imgView"
            id="imgview"
            style="height:0px"
            :src="url" 
            :preview-src-list="srcList">
            </el-image>
        </div>
        <transition name="slide-fade">
        <div class="toc" v-if="tocNav&&toc.length" v-show="tocIsShow">
            <div class="toc-top a-tag">
                <span class="toc-title">TOC</span>
                <a href="javascript:;" class="toc-close" @click="tocIsShow=false">「 关闭 」</a>
            </div>
            
            <ul >
                <li v-for="item of toc" :key="item.id"  @click="toTarget(item.id)" :style="{'padding-left':item.tag-maxTitle+'em'}" v-html="item.text">
                </li>
            </ul>
        </div>
        </transition>
        <transition name="slide-fade">
             <div class="toc-tag"  v-if="tocNav &&toc.length" v-show="!tocIsShow" @click="tocIsShow=true"> 
                <i></i>
                <i></i>
                <i></i>
            </div>
        </transition>
        
    </div>

</template>
<script>
import {marked}  from 'marked' 
import hljs   from 'src/utils/highlight.min.js' 
import { ElNotification } from 'element-plus'
let rendererMD = new marked.Renderer();
const TAG_NAME = 'demo-mobai'


let Deom=true;
try {
　　// 此处是可能产生例外的语句
    customElements.define(TAG_NAME, class DemoSandbox extends HTMLElement {
    constructor() {
        super()
        // 使用影子DOM
        this.shadow = this.attachShadow({
        mode: 'open'
        })
        // 获取关联的代码块模板的ID
        const templateId = this.getAttribute('template')
        const $template = document.getElementById(templateId)
        if (!templateId) {
        return
        }
        // 获取代码块内容
        const template = $template.innerHTML
        console.log(templateId)
        let id=parseInt(templateId.split('demo-mobai-template-')[1]);
        console.log(id%2==0)
        if(id%2==0){
              // 用获取到的代码块来填充影子DOM的HTML
            let code=marked('``` html  \n'+template+'\n```', {
                sanitize: false,
                highlight: function (code) {
                        return hljs.highlightAuto(code).value;
                },
            })
            this.shadow.innerHTML =`
            <style>
                :host {
                    display:block;
                    width:100%;
                    padding: 0;
                    border: 1px solid #f0f0f0;
                    color: #414240;
                    font-size: 1rem;
                    position: relative;
                    margin: 10px 0;
                    min-height: 36px;
                }
                :host:before {
                    content: " ";
                    position: absolute;
                    -webkit-border-radis: 50%;
                    border-radius: 50%;
                    background: #ff6058;
                    width: 12px;
                    height: 12px;
                    left: 15px;
                    margin-top: 10px;
                    -webkit-box-shadow: 20px 0 #ffbd2b, 40px 0 #3cef57;
                    box-shadow: 20px 0 #ffbd2b, 40px 0 #3cef57;
                    z-index: 2;
                }
                :host:after {
                    content: "demo";
                    position: absolute;
                    top:0px;
                    left: 50%;
                    z-index: 2;
                    color:var(--main-6);
                    font-weight:bold;
                    transform: translateX(-50%);
                    font-size: 20px;
                    line-height:32px
                }
                * {
                    box-sizing: border-box;
                }
                
                #demo-run {
                    padding:20px;
                    background-color:white;
                    border-top: 32px solid #ecf5ff;
                    border-radius: 6px;
                    overflow-x: auto;
                    overflow-y: hidden;
                    position:relative;
                }
                #demo-code {
                    padding:20px;
                    border-top: 1px solid #eaeefb;
                    font-size: 85%;
                    font-family: "Operator Mono SSm A","Operator Mono SSm B","Operator Mono","Source Code Pro",Menlo,Consolas,Monaco,monospace;
                    line-height: 1.4;
                    background-color:#fefefe; 
                }
                #demo-code code{
                    display: block;
                    overflow-x: auto;
                }
                #demo-open {
                    width:100%;
                    -webkit-appearance: none;
                    border:none;
                    border-top: 1px solid #eaeefb;
                    text-align:center;
                    padding: 10px 20px;
                    font-size: 14px;
                    cursor: pointer;
                    outline: 0;
                    transition: background-color .3s;
                    color: var(--main-6);
                    background-color:#fff
                }
                #demo-open:hover,
                #demo-open:active {
                    background-color: var(--main-9);
                }
            </style>
            <div id="demo-run">${template}</div>
            <div id="demo-code" hidden>${code}</div>
            <button id="demo-open">查看源码</button>
            <style>
            .hljs{display:block;overflow-x:auto}.hljs-comment,.hljs-meta{color:#969896}.hljs-emphasis,.hljs-quote,.hljs-string,.hljs-strong,.hljs-template-variable,.hljs-variable{color:#df5000}.hljs-keyword,.hljs-selector-tag,.hljs-type{color:#a71d5d}.hljs-attribute,.hljs-bullet,.hljs-literal,.hljs-number,.hljs-symbol{color:#0086b3}.hljs-name,.hljs-section{color:#63a35c}.hljs-tag{color:#333}.hljs-attr,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-title{color:#795da3}.hljs-addition{color:#55a532;background-color:#eaffea}.hljs-deletion{color:#bd2c00;background-color:#ffecec}.hljs-link{text-decoration:underline}.hljs-comment,.hljs-quote{color:#998}.hljs-keyword,.hljs-selector-tag,.hljs-subst{font-weight:700}.hljs-literal,.hljs-number,.hljs-tag .hljs-attr,.hljs-template-variable,.hljs-variable{color:teal}.hljs-doctag,.hljs-string{color:#d14}.hljs-section,.hljs-selector-id,.hljs-title{color:#900;font-weight:700}.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type{color:#458;font-weight:700}.hljs-link,.hljs-regexp{color:#009926}.hljs-bullet,.hljs-symbol{color:#990073}.hljs-built_in,.hljs-builtin-name{color:#0086b3}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.hljs-emphasis{font-style:italic}
            </style>
            `
            const co= this.shadow.getElementById("demo-code")
            this.shadow.getElementById("demo-open").addEventListener(
            "click", (function() {
                co.hasAttribute("hidden") ? co.removeAttribute("hidden") : co.setAttribute("hidden", "")
            }));
        }else {
             this.shadow.innerHTML =`
            <div id="demo-run">${template}</div>
            `
        }

      
        // 移除掉关联的template节点
            // 移除掉关联的template节点
        $template.parentNode.removeChild($template)
        // 处理 script
        // 1. 查找影子DOM中刚才填充的script节点
        const scripts = Array.from(this.shadow.querySelectorAll('script'))
        console.log(scripts)
        // 2. 创建一个用来保存影子DOM根节点的Script
        const $globalDefines = document.createElement('script')
        // 3. 创建一个自执行函数，将代码包裹起来
        $globalDefines.innerHTML = `(function(){
        const $component = document.querySelector('${TAG_NAME}[template="${templateId}"]');
        const $shadowDocument = $component.shadowRoot;
        `
        let arr=[]
        // 4. 拼合所有Script
        for(let i=0;i<scripts.length;i++){
            // 全局替换document为新的$shadowDocument
            if(scripts[i].src){
				// 创建
                const $sc = document.createElement('script')
                $sc.setAttribute("type", "text/javascript");
                $sc.setAttribute('src', scripts[i].src);
                this.shadow.appendChild($sc)
                arr.push(
					//通过Promise来解决，所有js都加载成功后，在将代码添加到Shadow DOM
                    new Promise(function(resolve,reject){
					//js 加载完成回执行
                    $sc.onload = function() {
                        console.log($sc)
                        resolve();
                        };
                    })
                )
                this.shadow.getElementById('demo-run').removeChild(scripts[i])
                continue
            }
           
            $globalDefines.innerHTML += `{
                ${scripts[i].textContent.replace(/(document)\.(getElementById|querySelector|querySelectorAll|getElementsByClassName|getElementsByName|getElementsByTagName)/gm, '$shadowDocument.$2').replace(/\r\n?/gm, '')}
            }`
            // 移除旧节点
            this.shadow.getElementById('demo-run').removeChild(scripts[i])
        }
        $globalDefines.innerHTML += `})();`
        
        Promise.all(arr).then(()=>{
            console.log('js加载成功');
            this.shadow.appendChild($globalDefines)
        })
    }
})
} catch(error) {
    Deom=false
    Notification.error({
        title: '浏览器不支持该功能',
        message: '请使用最新浏览器',
    })
}

export default {
    name: 'MyMarked',
    props: {
        initialValue: {
            // 初始化内容
            type: String,
            default: ''
        },
        markedOptions: {
            type: Object,
            default: () => ({})
        },
        copyCode: {// 复制代码
            type: Boolean,
            default: true
        },
        dompurify:{
            type:Boolean,
            default:true
        },
        copyBtnText: {// 复制代码按钮文字
            type: String,
            default: '复制代码'
        },
        imgView:{
            type: Boolean,
            default: true
        },
        tocNav:{
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            html: '',
            previewImgModal: false,
            previewImgSrc: '',
            previewImgMode: '',
            toc:[],
            tocIsShow:document.body.clientWidth>600?true:false,
            maxTitle:6,
            url:'',
            srcList: [
               
            ]
        };
    },
    mounted() {
        this.translateMarkdown();
    },
    methods: {
        translateMarkdown() {
            let that=this
            let DEMO_UID = 0
            let SHOW_UID=0
            rendererMD.code = function (code, language) {
                 // 提取language标识为 demo 的代码块重写
                 if(Deom){
                     if (language === 'demo') {
                         DEMO_UID+=2
                        // 页面中可能会有很多的示例，这里增加ID标识
                        const id = 'demo-mobai-template-' + (DEMO_UID)
                        // 将代码内容保存在template标签中
                        const template = `<template type="text/demo" id="${id}">${code}</template>`
                        // 将template和自定义标签通过ID关联
                        const sandbox = `<demo-mobai template="${id}"></demo-mobai>`
                        // 返回新的HTML
                        return template + sandbox
                    }
                    if(language === 'show'){
                         // 页面中可能会有很多的示例，这里增加ID标识
                        const id = 'demo-mobai-template-' + (++SHOW_UID)
                        // 将代码内容保存在template标签中
                        const template = `<template type="text/demo" id="${id}">${code}</template>`
                        // 将template和自定义标签通过ID关联
                        const sandbox = `<demo-mobai template="${id}"></demo-mobai>`
                        // 返回新的HTML
                        return template + sandbox
                    }
                 }else{
                      if (language === 'demo') {
                          language='html';
                      }
                 }
                
                 // 其他标识的代码块依然使用代码高亮显示
                 return `<div class="code-block"><span class="code-language">${language}</span><span class="copy-code el-icon-files">${that.copyBtnText}</span><pre rel="${language}"><code class="hljs ${language}">${hljs.highlightAuto(code).value}</code></pre></div>`
            }
            rendererMD.link = function(href,title,text){
                return '<a href="'+href+'" title="'+text+'" target="_blank">'+text+'</a>';
            }
            let anchor=0;
            if(that.tocNav){
                rendererMD.heading = function(text, level, raw) {
                    // const anchor = tocify.add(text, level);
                    if(level<that.maxTitle){
                        that.maxTitle=level
                    }
                    anchor+=1
                    that.toc.push(
                        {
                            'id':anchor,
                            'tag':level,
                            'text':text
                        }
                    )
                    return `<h${level} id="toc-nav${anchor}">${text}</h${level}>`;
                };
            }
            // customElements.define(TAG_NAME, Demobox)
            let html = marked(this.initialValue, {
                sanitize: false,
                renderer: rendererMD,
               
                ...this.markedOptions
            })
            this.html = html;
            // this.addCopyListener();
            if(this.imgView){
				// this.srcList
				const b=/<img([\s]+|[\s]+[^<>]+[\s]+)src=(\"([^<>"\']*)\"|\'([^<>"\']*)\')[^<>]*>/gi;
				const s=html.match(b);
				for(let i= 0;i<s.length;i++) 
				{ 
					const ss = s[i].match(b);
					this.srcList.push(RegExp.$3+RegExp.$4)
					console.log(RegExp.$3+RegExp.$4)
				} 
                this.addImageClickListener();
            }
        },
        addImageClickListener() {// 监听查看大图
            const {imgs = []} = this;
            if (imgs.length > 0) {
                for (let i = 0, len = imgs.length; i < len; i++) {
                    imgs[i].onclick = null;
                }
            }
            setTimeout(() => {
                this.imgs = this.$refs.preview.querySelectorAll('img');
                for (let i = 0, len = this.imgs.length; i < len; i++) {
                    this.imgs[i].onclick = () => {
                        const src = this.imgs[i].getAttribute('src');
                        this.url=src
                            setTimeout(() => {
                            document.getElementById("imgview").click()
                            },100)
                    };
                }
            }, 1000);
        },
        toTarget(target){
            target='#toc-nav'+target
            let toElement = document.querySelector(target);
            toElement.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest'
            })
        },
    },
    watch: {
        initialValue() {
            this.translateMarkdown();
        }
    },
    destroyed () {
        window.removeEventListener('scroll', this.scroll, false)
    },
};
</script>
<style lang="stylus" scoped>

.marked
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    align-items: flex-start;
    .write
        flex: 1 1 auto;
        width: 1%;
        overflow: hidden;
    .toc
        width: 220px;
        margin-left: 20px;
        border-left: 1px solid #efefee
        position: sticky;
        top: 100px;
        flex-shrink: 0;
        padding-left 10px
        .toc-top
            display: flex;
            justify-content: space-between;
            align-items center
            padding 10px 0
            .toc-title
                font-size 18px
                &:before
                    content '#'
                    color var(--main-6)
                    padding-right 3px
            .toc-close
                font-size 14px;
                color #989898
                cursor pointer
        
        li
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin-bottom: 10px;
            line-height: 1em;
            text-align: left;
            font-size: 14px;
            color: #8599ad;
            transition: .2s;
            cursor pointer
            &:hover
                color var(--main-6)
                text-decoration: underline;
            &:before
                content '- '
        .acitve
            color var(--main-6)
    .toc-tag
        width 40px
        height 40px
        position fixed
        right 20px
        bottom 85px
        z-index 999
        background #585d5d
        display flex
        align-items: center;
        justify-content: center;
        flex-flow: column;
        transition all .3s
        cursor pointer
        &:hover
            background-image: linear-gradient(to right, #8EC5FC,#9FACE6)
            i:nth-child(1)
                transform translateX(2px)
            i:nth-child(3)
                transform translateX(-2px)
        i
            display: block;
            width: 24px;
            height: 2px;
            background-color: hsla(0,0%,100%,.75);
            margin: 3px 0;
            transition: all .2s ease-in-out;
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>