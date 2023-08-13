<template>
  <div class="container link-frie">
    <h1 class="mess-title" id="next">
      <el-icon><Link /></el-icon>优秀的小伙伴们！
    </h1>
    <el-row>
      <el-col
        :xs="24"
        :span="6"
        class="link-cat"
        v-for="(item,index) in friends"
        :key="index"
        :offset="index > 0 ?1 : 0">
        <el-card :body-style="{ padding: '10px' }" shadow="hover">
              <div class="card-header">
                <img             
                :src="item.cover?item.cover:'https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg'"
                class="image" >
              </div>
              <div class="card-body">
                <h6 class="title">
                  {{item.title}}
                </h6>
                <p class="intro">
                  {{item.intro}}
                </p>
                <div class="user">
                  <el-avatar 
                    :src="item.author?  
                      (item.author?item.author.avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
                      :'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"></el-avatar>
                  <div class="user-info">
                    <h5>{{item.author}}</h5>
                    <small>更新于:{{item.updated}}</small>
                  </div>
                  <el-button class="button" type="text" icon="el-icon-share" @click="openNewWindow(item.site)">前往</el-button>
                </div>
              </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script  setup lang="ts">
import type {FriendsLink} from 'src/services/apis/home'
import {defineProps} from  'vue'

const friends = defineProps({
  friends: {
    type: Array as () => FriendsLink[]|undefined,
    default: undefined,
  },
})

function openNewWindow(url:string){
          window.open(url,"_blank")
      }

</script>
<style lang="stylus" scoped>
  
  h1 {
      text-align: center;
      padding-bottom: .3em;
      font-size: 2em;
      line-height: 1.2;
      margin: 1.2em auto 1.2em;
      font-weight: 700
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }


.card-header img {
  width: 100%;
  // height: 200px;
  object-fit: cover;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
}

.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
  text-align :right;
  float: right;
}
.tag-teal {
  background-color: #47bcd4;
}
.tag-purple {
  background-color: #5e76bf;
}
.tag-pink {
  background-color: #cd5b9f;
}

.card-body p {
  font-size: 13px;
  margin: 0 0 30px;
}

.button {
    // margin-top :10px;
    // margin-left :70%;
    margin-bottom: 10px;
    float: right;
    text-align:right;
  }
.user {
  display: flex;
  margin-top: auto;
  width: 100%;
  justify-content: space-around;
}
.el-avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px
}
.user img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.user-info {
  margin-left: -15px
}
.user-info h5 {
  margin: 0;
  font-size :15px
}
.user-info small {
  color: #545d7a;
}




.el-card{
  margin-bottom:20px;

  .img {
    max-width: 100%;
  }
}

.link-frie {
    position: relative;
    padding: 10px 0;
    background: #eaf1f51f;
    background-image :url('src/assets/link_bg.jpg');

  &:hover {
    .mess-title {
      color: #5adcce;
    }
  }
}


@media (max-width: 992px){
  .el-card{
    padding: 5px,5px,5px,5px;
    margin-bottom:30px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  }
  .el-col-offset-1 {
    // 取消offset
    margin-left: 0px; 
  }
}
</style>    