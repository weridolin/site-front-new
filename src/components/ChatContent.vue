<template>
    <el-row :gutter="12">
    <el-col :span="props.type=='receiver'?4:20" class="chat-content-avatar">
        <el-avatar> {{username}} </el-avatar>
    </el-col>
    <el-col :span="props.type=='receiver'?20:4" class="chat-content">
        <el-card shadow="always"> {{props.content}} </el-card>
    </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import { ref,reactive,watch } from 'vue'
    import {useAuthStore} from 'src/store/user'
    import type {ChatMessage} from 'src/services/apis/home'

    const props = withDefaults(defineProps<ChatMessage>(),{
        type:"receiver",
        content:"这里是机器人您可以输入关键字,我会尽量回复..."
    })

    const {isLogin,userInfo} = useAuthStore()
    const username = ref("")
    
    watch(isLogin, () => {
        if (props.type=="sender"){
            if (isLogin.value){
                username.value=userInfo?.profile.user.username?userInfo?.profile.user.username:"undefined"
            }else{
                username.value="guest"
            }
        }else{
            username.value="uncle lin"
        }
    })


</script>
