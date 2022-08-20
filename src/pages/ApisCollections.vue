<template>
    <el-row>
        <h2 opacity="90" text="base" font="bold" p="1" class="title">
            🗂️Apis信息汇总平台
        </h2>
    </el-row>

    <div
        v-for="(value,type,index) in ApiInfos" 
        :key="index"
    >   
        <el-row class="item-title">
                {{value.display}}
        </el-row>    
        <el-row class="item-list"> 
        <ApiTag
            v-for="item in value.items" :key="item.label"
            :active="apiSelect.includes(item.content)"
            :type="type"
            @click="selectApi(item.content)"
        >
            <span  class="inline-flex">{{item.prefixIcon}}</span>
            <span class="inline-flex" m="l-1" style="margin-left: 0.25rem;">{{item.content}}
            </span>
        </ApiTag>
    </el-row> 
    </div>
    <div class="filter-condition">
        <el-divider>
            <el-icon><star-filled /></el-icon>
            筛选条件
        </el-divider>
        <el-row>
            <ApiTag
                v-for="value in condition" :key="value"
                :active="conditionSelect.includes(value)"
                type="condition"
                @click="selectCondition(value)"
            >
                <span  class="inline-flex">🔎</span>
                <span class="inline-flex" m="l-1" style="margin-left: 0.25rem;">{{value}}
                </span>
            </ApiTag>
        </el-row>
    </div>

    <div class="result">
        <el-divider>
            <el-icon><star-filled /></el-icon>
            查找结果
        </el-divider>
        <el-row>
            <ApiTag
                v-for="value in result" :key="value.title"
                :active="false"
                type="result"
                @click="redirectToUrl(value.url)"
            >
                <span  class="inline-flex">🪄</span>
                <span class="inline-flex" m="l-1" style="margin-left: 0.25rem;">{{value.title}}
                </span>
                <span  class="inline-flex result-suffix" >🔗</span>
            </ApiTag>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import ApiTag from 'src/components/ApiTags.vue'
import { ref,computed } from 'vue'
import { StarFilled } from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'

const conditionSelect =ref([""])

const apiSelect=ref([""])


const ApiInfos = ref({
    "life":
        {   
            "display":"🎬生活中常用Api",
            "items":[
                {"label":1,"content":"内容1","type":"life","prefixIcon":"🍅"},
                {"label":2,"content":"内容2","type":"life","prefixIcon":"🍅"},
                {"label":3,"content":"内容13","type":"life","prefixIcon":"🍅"},     
                {"label":1,"content":"内容4","type":"life","prefixIcon":"🍅"},
                {"label":2,"content":"内容5","type":"life","prefixIcon":"🍅"},
                {"label":3,"content":"1212","type":"life","prefixIcon":"🍅"},  
            ],
        },
    
    "work":
        {    
            "display":"💻工作中常用API",
            "items":[
                {"label":1,"content":"213","type":"work","prefixIcon":"🍅"},
                {"label":2,"content":"223242222222","type":"work","prefixIcon":"🍅"},
                {"label":3,"content":"222423222222","type":"work","prefixIcon":"🍅"},
            ]
        },
    "card":{
            "display":"👔证件相关API",
            "items":
            [
            {"label":1,"content":"内容12321","type":"card","prefixIcon":"🍅"},
            {"label":2,"content":"22231321222222","type":"card","prefixIcon":"🍅"},
            {"label":3,"content":"22224214122222","type":"card","prefixIcon":"🍅"}  
            ]      
    }
})

const condition = ref([
    "免费","收费"
])

const result =ref([
    {
        "title":"res",
        "url":"https://www.baidu.com"
    },
        {
        "title":"res",
        "url":"https://www.baidu.com"
    }
])

const active =ref(true)

function selectApi(api:string){
    // console.log("select api ",api)
    // active.value=false
    // em
    if (!apiSelect.value.includes(api)){
        apiSelect.value.push(api)
        console.log("select api ",api)
    }else{
        console.log("remove api ",api)
        const index = apiSelect.value.indexOf(api)
        apiSelect.value.splice(index,1)
    }
    ElMessage.info("功能建设中...")
    
}

function selectCondition(condition:string){
    if (!conditionSelect.value.includes(condition)){
        conditionSelect.value.push(condition)
        console.log("select api ",condition)
    }else{
        console.log("remove api ",condition)
        const index = conditionSelect.value.indexOf(condition)
        conditionSelect.value.splice(index,1)
    }
    ElMessage.info("功能建设中...")
}

function getApiInfos(){

}

function redirectToUrl(url:string){
    console.log("join to url",url)
    window.open(url)
}


</script>

<style scoped>

.title{

    font-weight: 700;
    padding: 2rem;
    font-family: bold;
    text-align: center;
}

.item-title{
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
    padding: 0.5rem;
    font-family: bold;
    text-align: center;
}
.apiInfos{
    justify-content: center
}

.el-row {
    justify-content: center;
    margin-left: 10%;
    margin-right: 10%;
}
.filter-condition{
    margin-top: 5%;
}

.result {
    margin-top: 5%; 
    margin-bottom: 5%;
}
.result-suffix{
    margin-left:5px;
}
</style>