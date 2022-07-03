<template>
  <div class="login">
    <el-row class="row">
      <el-col :xl="6" :md="8" :sm="12" :xs="22" class="login-con blog-animation">
        <div class="login-img">
          <img src="~@/assets/logo.svg" />
        </div>
        <p class="login-welcome">找回密码</p>
        <el-form :model="formCustom" status-icon :rules="rules" ref="email">
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-user"
              type="email"
              v-model="formCustom.email"
              placeholder="绑定的邮箱号"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="formCustom" status-icon :rules="rules" ref="formCustom">
          <el-form-item prop="captcha">
            <el-input
              prefix-icon="el-icon-user"
              type="text"
              v-model="formCustom.captcha"
              placeholder="请输入邮箱验证码"
              autocomplete="off"
            >
              <el-button
                class="email"
                slot="append"
                @click="sendEmail('email')"
              >{{countdown==60?'点击发送验证码':countdown+'s后重新发送'}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              type="password"
              v-model="formCustom.password"
              placeholder="新密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              prefix-icon="el-icon-lock"
              type="password"
              v-model="formCustom.checkPass"
              placeholder="确认新密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button v-loading="loading" class="btn" @click="forget('formCustom')">提交</el-button>
            <div class="a-tag user">
              <router-link to="/sign">注册账号</router-link>
              <router-link to="/login">立即登录</router-link>
            </div>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Forget",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formCustom.checkPass !== "") {
          this.$refs.formCustom.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formCustom.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      countdown: 60,
      formCustom: {
        email: "",
        password: "",
        checkPass: "",
        captcha: "",
      },
      rules: {
        password: [
          { validator: validatePass, trigger: "change" },
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "密码长度在 6到 20 个字符",
            trigger: "change",
          },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "change" },
          { required: true, message: "请输入确认密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6到 20 个字符",
            trigger: "change",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "change",
          },
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    sendEmail(email) {
      this.$refs[email].validate((valid) => {
        console.log(valid);
        let that = this;
        if (valid) {
          if (that.countdown == 60) {
            that
              .$post("/apis/sendEmail", {
                email: that.formCustom.email,
              })
              .then(function (response) {
                that.$message({
                  showClose: true,
                  message: "邮件发送成功",
                  type: "success",
                });
                setTimeout(that.setTime, 1000);
              })
              .catch(function (error) {
                that.loading = false;
                that.countdown = 60;
              });
          } else {
            that.$message({
              showClose: true,
              message: "请在" + that.countdown + "s后重试！",
              type: "warning",
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "按照提示正确填写邮箱地址",
          });
          return false;
        }
      });
    },
    forget(formName) {
      this.$refs[formName].validate((valid) => {
        this.$refs["email"].validate((email) => {
          if (valid && email) {
            let that = this;
            if (!that.loading) {
              that.loading = true;
              this.$post("/apis/user/forget", this.formCustom)
                .then(function (response) {
                  that.$message({
                    showClose: true,
                    message: response.message,
                    type: "success",
                  });
                  that.$router.push("/login");
                })
                .catch(function (error) {
                  that.loading = false;
                });
            } else {
              that.$message({
                showClose: true,
                message: "正在找回密码中……",
                type: "success",
              });
            }
          } else {
            this.$notify.error({
              showClose: true,
              title: "错误",
              message: "按照提示正确填写账号和密码",
            });
            return false;
          }
        });
      });
    },
    setTime() {
      let that = this;
      if (that.countdown == 0) {
        that.countdown = 60; //60秒过后button上的文字初始化,计时器初始化;
        return;
      } else {
        that.countdown--;
      }
      setTimeout(function () {
        that.setTime();
      }, 1000); //每1000毫秒执行一次
    },
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/login.styl';

>>>.el-input-group__append:hover {
  background: var(--main-6);
  color: #fff;
}

.row {
  min-height: 680px;
}
</style>