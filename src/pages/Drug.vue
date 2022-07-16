<template>
  <div id="app">

        <Particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                :options="{
                    background: {
                        color: {
                            value: '#0d47a1'
                        }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push'
                            },
                            onHover: {
                                enable: true,
                                mode: 'repulse'
                            },
                            resize: true
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: '#ffffff'
                        },
                        links: {
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        collisions: {
                            enable: true
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: {
                                default: 'bounce'
                            },
                            random: false,
                            speed: 6,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800
                            },
                            value: 80
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        }
                    },
                    detectRetina: true
                }"
        />
  <div class="drug-screen">
    <el-row  class="el-row-one">
    </el-row>
    <el-row class="drug-top" >
      <div class="drug-info container">
        <!-- <h1 class="mess-title blog-animation"> -->
        <i class="drug-word"
          >{{word}}</i>
      </div>
    </el-row>

    <el-row>
      <el-col :xs="22" :sm="22" :md="24" :lg="23" :xl="23">
        <div class="drug-button-group" style="text-align: right">
          <a class="drug-button"  @click="copy()" >点我复制</a>
          <a class="drug-button" @click="next()">再来一条</a>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="0" :lg="1" :xl="1">
        <div></div>
      </el-col>
    </el-row>
  </div>
</div> 
</template>

<script setup lang="ts">
  // import Particles from "particles.vue3";
  import {ref,reactive} from 'vue'
  import {ElNotification } from "element-plus"
  import {DrugApis} from 'src/services/apis/drug'
  // import Particles from 'src/components/Particles.vue'
  import { loadFull } from "tsparticles";

  const word=ref("")
  const last_id =  ref(1)

  function  copy(){
        // 创建一个虚拟的input来实现

        let _word = document.querySelector(".drug-word")
        if (_word!=null){
          let value = _word.textContent
          if (value){
            word.value =value
          }
        } 
        let newInput = document.createElement("input");
        // 讲存储的数据赋值给input的value值
        newInput.value = word.value;
        // appendChild() 方法向节点添加最后一个子节点。
        document.body.appendChild(newInput);
        // 选中input元素中的文本
        // select() 方法用于选择该元素中的文本。
        newInput.select();
        document.execCommand("Copy");   // 执行复制操
        newInput.remove() 
        ElNotification({
          message: '复制成功',
          type: 'success'
        });
    }

  function next() {
        let res = DrugApis.getDrugWord(last_id.value)
        res.then(function (res) {
            console.log(">>> get random drug word",res)
            word.value =res.data.content
            last_id.value = res.data.id
        })
        .catch(function (error) {
            console.log(">>> get random drug word",error)
        })   
    }

  const particlesInit = async (engine) => {
      await loadFull(engine);
  }

  const particlesLoaded = async (container) => {
      console.log("Particles container loaded", container);
  }

  next()
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
  background-repeat:no-repeat;
  background-image: url('src/assets/drug-bg.jpg');
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