<template>

  <el-affix :offset="80">

    <div class="wave-btn"  :style="{'animation-play-state':isRunning?'running':'paused'}">
        <!-- <el-tooltip
            class="box-item"
            effect="light"
            :content="isRunning?'api-spider脚本正在运行...':'点击启动api-spider脚本...'"
            placement="right"
        >
          <el-button  :icon="isRunning?VideoPause:VideoPlay"  class="pause" name="pause"  circle />
        </el-tooltip> -->
        <el-popover placement="right" width="580" trigger="click">
        <template #reference>
          <el-button  :icon="Files"  class="pause" name="pause" @click="getApiResource()" circle />
        </template>
        <el-table :data="apiResourceData">
          <el-table-column width="100" prop="name" label="脚本名称" />
          <!-- <el-table-column width="100" prop="created" label="脚本创建时间" /> -->
          <el-table-column width="80" prop="is_forbidden" label="是否禁用" />
          <el-table-column width="100" prop="last_run_time" label="最近一次运行时间" />
          <!-- <el-table-column width="300" property="script_path" label="脚本路径" /> -->
          <el-table-column width="100" prop="is_running" label="是否正在运行" >
            <template #default="scope">
              <el-tag
                v-show="scope.row.is_running"
                :type="scope.row.is_running  ? 'success' : ''"
                disable-transitions
                >
                {{scope.row.is_running  ? '运行中' : '启动'}}
              </el-tag>
              <el-button 
                v-show="!scope.row.is_running"
                :icon="VideoPlay"  
                class="run" 
                name="run" 
                size="small" 
                @click="onBtnClick(scope.row.name)"  
                type="primary" 
                round > 运行
              </el-button>
            </template>

          </el-table-column>
          <el-table-column width="200" property="description" label="脚本描述" />          
        </el-table>
    </el-popover>

    </div>

    </el-affix>

</template>


<script lang="ts" setup>
  import { ref,computed } from 'vue'
  import {
      VideoPlay,
      VideoPause,
      Files
  } from '@element-plus/icons-vue'
  import {ThirdApis} from 'src/services/apis/third'
  import {ElMessage} from 'element-plus'
  import type {ApiResource} from 'src/services/apis/third'
  /*  play button */

  const isRunning = ref<boolean>(false)

  const apiResourceData = ref<ApiResource[]>()


  /*  play button  */
  function onBtnClick(spider_name:string){
      // const playBtn = document.querySelector('.wave-btn')

      if (isRunning.value){
          isRunning.value =false
          ElMessage.info("api spider正在运行中...")
          
      }else{
          let res=ThirdApis.startSpiderScript(spider_name)
          // console.log("122",res)
          res.then(
              function(res){
                  console.log("启动spider脚本成功",res)
                  isRunning.value =true
              }
          ).catch(function(err){
              console.log("启动spider脚本失败",err)
              if (err.status==403){
                  ElMessage.warning("当前账户没有权限")
              }
          })
      }
      }

  function getApiResource(){
    ThirdApis.getSpiderResource()
    .then(res=>{
      console.log("获取spider资源信息",res)
      apiResourceData.value=res.data
    })
    .catch(err=>{
      console.log("获取api资源信息失败",err)
      apiResourceData.value=[]
    })
  }
    

</script>

<style lang="scss" scoped>

.pause {
    margin-left: 0px
}

.wave-btn {
  height: 100px;
  width: 100px;
  border-radius: 80%;
  background-color: rgb(214, 226, 170);
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wave-btn .icon{
  width: 100px;
  height: 100px;
  object-fit:contain;
}
.wave-btn:before,.wave-btn:after{
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: inherit;
  animation-name:startAnimation;
  animation-duration:2.4s;
  animation-iteration-count:infinite;
  animation-timing-function:ease-out;
  z-index: -1;
}
.wave-btn:after{
  animation-delay:.6s;
}



@keyframes startAnimation{
  from{
   transform:scale(1);
    opacity:.7;
  }
  to{
    transform:scale(2);
      opacity:0;
  }
}

</style>