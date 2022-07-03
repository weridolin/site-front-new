<template>

  <div class="drug-screen">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <el-row  class="el-row-one">
    </el-row>
    <el-row class="drug-top" >
      <div class="drug-info container">
        <!-- <h1 class="mess-title blog-animation"> -->
        <i class="drug-word"
          >{{this.word.content}}</i
        >

      </div>
    </el-row>

    <el-row>
      <el-col :xs="22" :sm="22" :md="24" :lg="23" :xl="23">
        <div class="drug-button-group" style="text-align: right">
          <a href="#" class="drug-button"  @click="copy()" >点我复制</a>
          <a href="#" class="drug-button" @click="next()">再来一条</a>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="0" :lg="1" :xl="1">
        <div></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Notification } from 'element-ui';
export default {
  name: "Drug",
  components: {},
  data() {
    return {
      src: "~@/assets/drug-bg.jpg",
      word:"",
    };
  },
  created() {
      this.next()
  },
  methods: {
    copy(){
        // 创建一个虚拟的input来实现
        var word = document.querySelector(".drug-word").textContent;  
        let newInput = document.createElement("input");
        // 讲存储的数据赋值给input的value值
        newInput.value = word;
        // appendChild() 方法向节点添加最后一个子节点。
        document.body.appendChild(newInput);
        // 选中input元素中的文本
        // select() 方法用于选择该元素中的文本。
        newInput.select();
        document.execCommand("Copy");   // 执行复制操
        newInput.remove() 
        this.$message({
          message: '复制成功',
          type: 'success'
        });
    },
    next() {
        let that = this;
        this.$get("/api/v1/drug/words/random?last_id="+this.word.id)
        // this.$get("http://127.0.0.1:8000/api/v1/blogs/bglist")
        .then(function (res) {
            console.log(">>> get random drug word",res)
            that.word = res;
        })
        .catch(function (error) {});
        
    },
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:300');

// body {
//   display: flex;
//   height: 100vh;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   background: #222;
// }

.rainbow {
  letter-spacing: 0.2rem;
  font-size: 1.2rem;
  font-family: Lato, serif;
  text-transform: uppercase;

  span {
    animation: rainbow 50s alternate infinite forwards;
  }
}
.drug-top {
  height: 10%;
}

@keyframes rainbow {
  @for $i from 0 through 20 {
    #{percentage($i * 0.05)} {
      color: hsl(random(360%), 75, 75);
    }
  }
}
</style>
<style lang="stylus" scoped>
@import '~@/assets/style/home.styl';

#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute; // 设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}

.drug-word {
  color: #fff;
  text-decoration: none;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0 25px;
  display: block;
  text-align: center;
  text-shadow: 0 0 10px rgb(20, 129, 202), ;
}

.drug-screen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  overflow: hidden;
  background-image: url('~@/assets/drug-bg.jpg');
}

.el-row {
  margin-bottom: 20%;

  &:last-child {
    margin-bottom: 0;
  }
}

.drug-screen:before {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  content: '';
  background-size: cover;
  // opacity :0.5;
}

@media (max-width: 992px) {
  .mess-title {
    font-size: 25px !important;
  }

  .load-text {
    font-size: 18px !important;
  }

  .drug-top {
    height: 60%;
  }
  .drug-button {
  position: relative;
  padding: 10px 30px;
  // margin: 0 20px;
  color: #21ebff;
  text-decoration: none;
  font-size: 15px;
  text-transform: uppercase;
  transition: 0.5s;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
  }

  .drug-word {
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    // font-weight: 700;
    letter-spacing: 1px;
    margin:120px 10px;
    display: block;
    text-align: center;
    text-shadow: 0 0 10px rgb(20, 129, 202), ;
  }

  .el-row-one{
      margin-bottom:30%;
  }
}

.drug-button {
  position: relative;
  padding: 10px 30px;
  margin: 0 20px;
  color: #21ebff;
  text-decoration: none;
  font-size: 15px;
  text-transform: uppercase;
  transition: 0.5s;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
}

.drug-button:hover {
  background: #21ebff;
  color: #111;
  box-shadow: 0 0 50px #21ebff;
  transition-delay: 0.5s;
}

.drug-button:nth-child(1) {
  filter: hue-rotate(115deg);
}

.drug-button:nth-child(3) {
  filter: hue-rotate(270deg);
}

.drug-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-top: 2px solid #21ebff;
  border-left: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.5s;
}

.drug-button:hover::before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

.drug-button::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #21ebff;
  border-right: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.5s;
}

.drug-button:hover::after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

</style>