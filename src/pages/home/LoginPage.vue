<template>
  <div class="background">
    <div class="wrapper">
      <div class="logo">
        <img :src="mine" alt="">
      </div>
      <div class="text-center mt-4 name">
        林叔叔个怪蜀黍的小屋🏡
      </div>
      <form class="p-3 mt-3">
        <div class="form-field d-flex align-items-center input-info">
          <span class="far fa-user" />
          <input
            id="userName"
            v-model="form.username"
            type="userName"
            name="userName"
            placeholder="用户名"
          >
        </div>
        <div
          v-if="status == '注册'"
          class="form-field d-flex align-items-center input-info"
        >
          <span class="fas fa-key" />
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            placeholder="输入邮箱"
          >
        </div>
        <div class="form-field d-flex align-items-center input-info">
          <span class="fas fa-key" />
          <input
            id="pwd"
            v-model="form.password"
            type="password"
            name="password"
            placeholder="密码"
          >
        </div>
        <div
          v-if="status == '注册'"
          class="form-field d-flex align-items-center input-info"
        >
          <span class="fas fa-key" />
          <input
            id="pwd2"
            type="password"
            name="password2"
            placeholder="再次输入密码"
          >
        </div>
        <el-button
          class="btn mt-3"
          type="primary"
          @click="
            () => {
              if (status == '注册' && !pwdVerify()) return;
              status == '登录' ? login(form) : register(form);
            }
          "
        >
          {{ status == "登录" ? "登录" : "注册" }}
        </el-button>
      </form>
      <div class="text-center footer fs-6">
        <a class="text-link">忘记密码?</a> or
        <a class="text-link" @click="changeStatus">{{ statusText }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mine from 'src/assets/mine.png'
import { ref, computed } from 'vue'
import { login, register, status } from 'src/pages/home/login'
import type { loginFormOrRegisterForm } from 'src/services/apis/auth'
import { ElMessage } from 'element-plus'

// const status = ref("登录");
const statusText = ref('注册')

// export interface LoginForm {
//   username: string;
//   password: string;
//   email: string;
//   telephone: "",
// }
const form = ref<loginFormOrRegisterForm>({
  username: '',
  password: '',
  email: '',
  telephone: '',
})

const changeStatus = () => {
  if (status.value == '登录') {
    status.value = '注册'
    statusText.value = '已有账号,登录'
    document.title = '注册'
  } else {
    status.value = '登录'
    statusText.value = '注册'
    document.title = '登录'
  }
}

const pwdVerify = () => {
  const pwd = document.getElementById('pwd') as HTMLInputElement
  const pwd2 = document.getElementById('pwd2') as HTMLInputElement
  if (pwd.value != pwd2.value) {
    ElMessage.error('两次密码不一致')
    return false
  }
  return true
}
</script>

<style scoped>
/* Importing fonts from Google */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

/* Reseting */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.background {
  /* background: url("src/assets/cloud.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; */
}

.text-link {
  cursor: pointer;
}
.wrapper {
  max-width: 350px;
  min-height: 500px;
  margin: 80px auto;
  padding: 40px 30px 30px 30px;
  /* background-color: #ecf0f3; */
  border-radius: 15px;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
  background: url("src/assets/index_bg1.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.logo {
  width: 80px;
  margin: auto;
}

.logo img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 3px #5f5f5f, 0px 0px 0px 5px #ecf0f3, 8px 8px 15px #a7aaa7,
    -8px -8px 15px #fff;
}

.wrapper .name {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  padding-left: 10px;
  color: #555;
  margin: 10% 1%;
}

.wrapper .form-field input {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
  /* border: 1px solid red; */
}

.wrapper .form-field {
  padding-left: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
  color: #555;
}

.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
  letter-spacing: 1.3px;
  margin-top: 3%;
  margin-bottom: 5%;
}

.wrapper .btn:hover {
  background-color: #039be5;
}

.wrapper a {
  text-decoration: none;
  font-size: 0.8rem;
  color: #03a9f4;
}

.wrapper a:hover {
  color: #039be5;
}

.wrapper .footer {
  margin-left: 3%;
  /* color: #555; */
}

@media (max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px;
  }
}
</style>
