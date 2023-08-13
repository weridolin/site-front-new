<template>
  <div class="route">
    <el-row>
      <el-col >
        <div>
          <el-timeline class="route-timeline">

            <el-timeline-item v-for="item in list" 
                :key="item.id"
                :timestamp= "item.finish_time" 
                placement="top" 
                color="#0bbd87">
              <el-card>
                <i > 🖍🖍🖍</i>
                <h6>{{item.update_content}}</h6>
                <p>{{item.author.username}} 提交于 {{item.finish_time}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row> 
  </div>
</template>
<script setup lang="ts">
  import { ref,reactive,computed } from 'vue';
  import {HomeApi} from 'src/services/apis/home'
  import type {updateLog} from 'src/services/apis/home'

  const list =ref<updateLog[]>()
  const card = ref(document.body.clientWidth > 885 ? "card" : "")
  // carousel: [],
  const src = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')


  async function get_list(){
      let res= await HomeApi.updateLog.getUpdateLogList()
      console.log("获取更新日志列表",res)
      list.value = res
    }

  const initUpdateLog = async () => {
        await get_list()
    }

    initUpdateLog()

</script>


<style lang="scss">
  .route-timeline .el-timeline-item__timestamp {
      color: #f1f1f7;
      line-height: 1;
      font-size: 15px;
  }
</style>
<style lang="stylus" scoped>

p {
  text-align :right;
  font-size: 15px;
}


.route {
  height: 100%;
  min-height: 100%;
  position: relative;
  padding: 50px 10px;
  box-sizing: border-box;
  background: url('src/assets/route-bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.el-row {
    margin-top: 5% ;
    margin-left: 20%;
    // &:last-child {
    //   margin-bottom: 0;
    // }
  }


.el-card {
  // background: radial-gradient(#99e8cc, #88d7cf);
  background: url('src/assets/card-bg1.jpg');
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.3s;
  width: 50%;
  border-radius: 5px;
}

.el-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

@media (max-width: 992px){
    .el-row {
        margin-top: 5% ;
        margin-left: 5%;
        // &:last-child {
        //   margin-bottom: 0;
        // }
      }

    .el-card {
      // background: radial-gradient(#99e8cc, #88d7cf);
      background: url('src/assets/card-bg1.jpg');
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      transition: 0.3s;
      width: 90%;
      border-radius: 5px;
    }

    .el-card:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .el-timeline-item__timestamp {
    color: #f1f1f7;
    line-height: 1;
    font-size: 15px;
}
}

</style>