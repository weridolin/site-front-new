<template>
<div>
  <div class="login-container">
    <!-- <Particles
      id="tsparticles"   
      :options="particles_config"
    /> -->

    <el-row>
      <el-col :xs="0" :sm="12" :md="12" :lg="12" :xl="12">
        <!-- 介绍栏 -->
        <div class="brand-info">
          <h2 class="brand-info__text">林叔叔是个怪蜀黍</h2>
          <p class="brand-info__intro">
            主要用于学习用，欢迎各位提出宝贵意见,侵权告知 ~~🌈🌀🌈🤗🙂
          </p>
        </div>
        <!--分享栏目 -->
      <div class="social-operation">
        <el-button class="iconfont tianji-iconhome" circle></el-button>
        <el-button
          type="primary"
          class="iconfont tianji-icongithub"
          circle
        ></el-button>
        <el-button
          type="success"
          class="iconfont tianji-iconwechat"
          circle
        ></el-button>
        <el-button
          type="info"
          class="iconfont tianji-iconqq"
          circle
        ></el-button>
        <el-button
          type="warning"
          class="iconfont tianji-iconmail"
          circle
        ></el-button>
      </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form
          ref="form"
          :model="form"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">
              登录
            </h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon name="user" />
            </span>
            <el-input
              ref="username"
              v-model="form.username"
              placeholder="username"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip
            v-model="capsTooltip"
            content="大写已经开启"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon name="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="form.password"
                :type="passwordType"
                placeholder="password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @blur="capsTooltip = false" 
                @keyup="login"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
                />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-button
            :loading="isLogining"
            type="success"
            style="width:100% ; margin-bottom: 10px"
            @click="login"
          >
            登录
          </el-button>

          <el-button
            :loading="isLogining"
            type="warning"
            style="width:100% ;margin-left: 0px;margin-bottom: 10px"
          >
            注册
          </el-button>

        </el-form>
        <!-- <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
          {{ $t("login.thirdpartyTips") }}
          <br />
          <br />
          <br />
          <social-sign />
        </el-dialog> -->
      </el-col>

    </el-row>
  <el-row>
    <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
        <div class="brand-info_moblie">
          <h2 class="brand-info__text">林叔叔是个怪蜀黍</h2>
          <p class="brand-info__intro">
            主要用于学习用，欢迎各位提出宝贵意见,侵权告知 ~~🌈🌀🌈🤗🙂
          </p>
        </div>
        <div class="social-operation-moblie">
        <el-button class="iconfont tianji-iconhome" circle></el-button>
        <el-button
          type="primary"
          class="iconfont tianji-icongithub"
          circle
          @click="openNewWindow"
        ></el-button>
        <el-button
          type="success"
          class="iconfont tianji-iconwechat"
          circle
        ></el-button>
        <el-button
          type="info"
          class="iconfont tianji-iconqq"
          circle
        ></el-button>
        <el-button
          type="warning"
          class="iconfont tianji-iconmail"
          circle
        ></el-button>
      </div>
      </el-col>
  </el-row> 
  </div>
</div>
</template>

<script setup lang="ts">
  import {ref,reactive} from 'vue'
  import { AuthApis } from "src/services/apis/auth"
  import { useAuthStore } from 'src/store/user'
  import {ElMessage} from "element-plus"
  import { getCurrentInstance } from '@vue/runtime-core';
  import type {
    loginForm
  } from "src/services/apis/auth"


  const form = reactive<loginForm>({
      username:"",
      password:"",
      email:"",
      telephone:""
  })

  const loginRules = {
    username: [{ validator: validateUsername, trigger: "blur" }], //blur:失去焦点时触发
    password: [{ validator: validatePassword, trigger: "blur" }],
  }

  const passwordType = ref("password")
  const isLogining = ref(false)
  const capsTooltip = ref(false)
    // private redirect?: string;
    // private otherQuery: Dictionary<string> = {};

  const {updateUserInfo,updateToken} = useAuthStore()
  const particles_config = {
      background: {
        color: {
          value: "#000000",
        },
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
        opacity: 0.2,
      },
      backgroundMask: {
        cover: {
          opacity: 0.2,
        },
      },
      fullScreen: {
        enable: true,
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            mode: "repulse",
          },
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          grab: {
            distance: 400,
            links: {
              opacity: 0.2,
            },
          },
          push: {
            groups: ["z5000", "z7500", "z2500", "z1000"],
          },
        },
      },
      particles: {
        color: {
          animation: {
            h: {
              speed: 20,
            },
          },
        },
        groups: {
          z5000: {
            number: {
              value: 70,
            },
            zIndex: {
              value: 50,
            },
          },
          z7500: {
            number: {
              value: 30,
            },
            zIndex: {
              value: 75,
            },
          },
          z2500: {
            number: {
              value: 50,
            },
            zIndex: {
              value: 25,
            },
          },
          z1000: {
            number: {
              value: 40,
            },
            zIndex: {
              value: 10,
            },
          },
        },
        links: {
          color: {
            value: "#ffffff",
          },
          opacity: 0.4,
        },
        move: {
          angle: {
            value: 10,
          },
          attract: {
            rotate: {
              x: 600,
              y: 1200,
            },
          },
          direction: "right",
          enable: true,
          path: {},
          outModes: {
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          speed: 5,
          spin: {},
        },
        number: {
          value: 200,
        },
        opacity: {
          animation: {
            speed: 3,
            minimumValue: 0.1,
          },
        },
        size: {
          animation: {},
        },
        zIndex: {
          value: 5,
          opacityRate: 0.5,
        },
      },
      emitters: {
        autoPlay: true,
        fill: true,
        life: {
          wait: false,
        },
        rate: {
          quantity: 1,
          delay: 7,
        },
        shape: "square",
        startCount: 0,
        size: {
          mode: "percent",
          height: 0,
          width: 0,
        },
        particles: {
          shape: {
            type: "images",
            options: {
              images: {
                src: "https://particles.js.org/images/cyan_amongus.png",
                width: 500,
                height: 634,
              },
            },
          },
          size: {
            value: 40,
          },
          move: {
            speed: 10,
            outModes: {
              default: "none",
              right: "destroy",
            },
            straight: true,
          },
          zIndex: {
            value: 0,
          },
          rotate: {
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 10,
              sync: true,
            },
          },
        },
        position: {
          x: -5,
          y: 55,
        },
      },
    }


  function  validateUsername(rule: any, value: string, callback: Function) {
      callback();
    }

  function validatePassword (rule: any, value: string, callback: Function){
      if (value.length < 3) {
        callback(new Error("The password can not be less than 3 digits"));
      } else {
        callback();
      }
    }


  function openNewWindow(){
      window.open('https://github.com/weridolin/site-front-new', '_blank');
  }

  function checkCapslock(e: KeyboardEvent) {
    const { key } = e;
    capsTooltip.value =key !== null && key.length === 1 && key >= "A" && key <= "Z";
  }

  function showPwd() {
    if (passwordType.value === "password") {
      passwordType.value = "";
    } else {
      passwordType.value = "password";
    }
    // $nextTick(() => {
    //   (this.$refs.password as Input).focus();
    // });
  }

  function login(loginForm:loginForm){
      isLogining.value=true
      AuthApis.login(loginForm,{
        timeout:1000*2*60
      }).then(function(res){
        if (res.code!=-1){
          ElMessage.success(`登录成功!`)
          console.log(">>> 登录成功",res)
          updateUserInfo({
            profile:res.profile,
            permissions_dict:res.permissions_dict
          })
          updateToken(res.access_token,res.refresh_token)
        }else{
          ElMessage.error(`T T 登录异常!(${res.message})`)
        }
        isLogining.value=false
      }).catch(function(err){
          ElMessage.error(`T T ${err.response.data.message}!`)
          isLogining.value=false
      }) 
  }


</script>

<style lang="scss" scoped >
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  // height: 100%;
  // width: 100%;
  // overflow: hidden;
  // background-color: $loginBg;
  // background-image: url(~@/assets/common-images/login_bg.jpg);
  // background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.5);
  overflow: hidden;
  &:before {
    //before为该元素增加修饰性内容 即在图片上加一层
    //遮罩，控制遮罩的透明度来控制图片的透明度
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/common-images/login_bg.jpg);
    background-size: cover;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
   
	.brand-info_moblie{
			      margin:50px 100px 0 90px;
      color: #fff;
		}
	
  .brand-info {
    margin: 220px 100px 0 90px;
    color: #fff;
  }
  .brand-info__text {
    margin: 0 0 22px 0;
    font-size:1.5rem;
    // font-weight: 400;
    text-transform: uppercase;
  }
  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }
  .social-operation {
    margin: 100px 100px 0 100px; //上右下左
    color: #fff;
    text-align: left;
  }
  .social-operation-moblie {
    margin: 20px 20px 0 80px; //上右下左
    color: #fff;
    text-align: left;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  @media only screen and (max-width: 960px) {
  .login-form {
    position: relative;
    width: 100%;
    max-width: 100%;
    padding: 100px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
}
}
</style>
