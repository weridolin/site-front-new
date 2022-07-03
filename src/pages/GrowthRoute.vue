<!--
 * @Description: 
 * @email: 359066432@qq.com
 * @Author: lhj
 * @software: vscode
 * @Date: 2021-10-02 16:28:06
 * @platform: windows 10
 * @LastEditors: lhj
 * @LastEditTime: 2021-10-05 16:15:02
-->
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

<script>

export default {
  name: "GrowthRoute",
  components: {
  },
  data() {
    return {
      list: [],
      card: document.body.clientWidth > 885 ? "card" : "",
      carousel: [],
      src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    };
  },
  methods: {
    get_list(){
      let that = this;
        this.$get("/api/v1/home/updatelog")
        // this.$get("http://127.0.0.1:8000/api/v1/blogs/bglist")
        .then(function (res) {
            console.log(">>> get route updatelog",res)
            that.list = res;
        })
        .catch(function (error) {})
        
    }
  },
  created() {
    this.get_list()
  },
};
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
  background: url('~@/assets/route-bg.jpg');
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
  background: url('~@/assets/card-bg1.jpg');
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
      background: url('~@/assets/card-bg1.jpg');
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