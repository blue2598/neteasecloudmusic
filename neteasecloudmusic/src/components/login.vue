<template>
  <div class="loginbox">
    <img src="../assets/images/logo.jpg" width="100px" height="100px" />
    <form class="login-form">
      <div class="input-field">
        <input type="text" v-model="phone" placeholder="请输入手机号" />
      </div>
      <div class="input-field">
        <input type="password" v-model="password" placeholder="请输入密码" />
      </div>
      <div class="button">
        <span class="login-button__text" @click="loginFn()">登录</span>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "@/api/index.js"; /*引入封装的axios*/
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    loginFn() {
      var phone = this.phone;
      var password = this.password;
      var result = /^1[3456789]\d{9}$/.test(phone);
      if (phone && password && result) {
        this.getLogin();
      }
      if (!phone) {
        Toast("请输入手机号");
        return;
      }
      if (!password) {
        Toast("请输入密码");
        return;
      }
      if (!result) {
        Toast("请输入正确的手机号");
        this.phone = "";
        return;
      }
    },
    getLogin() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true
      });
      axios({
        url:
          "/login/cellphone?phone=" +
          this.phone +
          "&password=" +
          this.password /*登录*/,
        method: "POST"
      })
        .then(res => {
          if (res.data.code == "200") {
            var idVal=res.data.account.id;
            localStorage.setItem("id",idVal)
            this.$router.push({ name: "Personal", params: { id: idVal } });
          } else {
            Toast(res.data.codec);
          }
          if (res.data.code == "502") Toast("用户名或者密码错误");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.loginbox {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #db2c1f;
}
.loginbox img {
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: 80px;
  margin: auto;
}
.login-form {
  height: 30%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
}
.input-field {
  width: 100%;
  height: 80px;
}
.input-field input {
  width: 70%;
  height: 50px;
  outline: none;
  border-radius: 25px;
  text-indent: 20px;
  font-size: 18px;
  color: #111;
  font-weight: 700;
}
.input-field input::placeholder {
  color: #999;
}
.button {
  width: 100%;
  height: 80px;
  text-align: center;
}
.button span {
  margin: 0 auto;
  background-color: #fff;
  color: #db2c1f;
  letter-spacing: 10px;
  display: block;
  width: 70%;
  height: 50px;
  font-size: 25px;
  line-height: 50px;
  border-radius: 25px;
}
</style>
