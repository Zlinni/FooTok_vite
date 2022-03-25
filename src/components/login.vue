<template>
  <el-container>
    <div class="logo">
      <img :src="logo" alt="logo" id="logo" />
    </div>
    <div class="interface">
      <!-- 登录 或者 注册 的选择盒子 -->
      <div class="choiceBox">
        <div class="loginBox">
          <p @click="isLogin = true" :class="{ active: isLogin }">登陆</p>
        </div>
        <div class="registerBox">
          <p @click="isLogin = false" :class="{ active: !isLogin }">注册</p>
        </div>
      </div>
      <!-- 登录界面 -->
      <div class="loginPage">
        <div class="loginForm" v-if="isLogin">
          <div class="usernameBox">
            <img :src="account" alt="" />
            <input
              type="text"
              name="username"
              id="login-username"
              placeholder="用户ID"
              maxlength="12"
              v-model="username"
              autocomplete
            />
          </div>
          <div class="passwordBox">
            <img :src="keyimg" alt="" />
            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="密码"
              maxlength="12"
              v-model="password"
              autocomplete
            />
          </div>
          <button id="submit" @click="userLogin">进入</button>
        </div>
        <div class="registerForm" v-else>
          <div class="usernameBox">
            <img :src="account" alt="" />
            <input
              type="text"
              name="username"
              id="login-username"
              placeholder="用户ID"
              maxlength="12"
              v-model="username"
            />
            <i class="iconfont icon-chenggong" v-show="userNameSuccess"></i>
            <p class="tips">{{ userNameTips }}</p>
          </div>
          <div class="passwordBox">
            <img :src="keyimg" alt="" />
            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="密码"
              maxlength="12"
              v-model="password"
              @keydown="showcommitpsw = true"
            />
            <i class="iconfont icon-chenggong" v-show="passWordSuccess"></i>
            <p class="tips">{{ passwordTips }}</p>
          </div>
          <div class="passwordBox" v-if="showcommitpsw">
            <img :src="keyimg" alt="" />
            <input
              type="password"
              name="comitpassword"
              id="login-password"
              placeholder="确认密码"
              maxlength="12"
              v-model="commitpsw"
            />
            <i class="iconfont icon-chenggong" v-show="commitpswSuccess"></i>
            <p class="tips">{{ commitpswTips }}</p>
          </div>
          <button id="submit" @click.native="userRegister">进入</button>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import { ref, reactive, toRefs, toRaw, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import getAssetsImages from "../hook/getAssetsImages";

export default {
  setup() {
    let imgUrl = reactive({
      logo: getAssetsImages("login", "斜眼看.png"),
      account: getAssetsImages("login", "用户登录icon.png"),
      keyimg: getAssetsImages("login", "密码icon.png"),
    });
    let userData = reactive({
      username: "",
      password: "",
    });
    let isLogin = ref(true);
    let commitpsw = ref("");
    let userNameTips = ref("");
    let passwordTips = ref("");
    let commitpswTips = ref("");
    let showcommitpsw = ref(false);
    let isSuccess = reactive({
      userNameSuccess: false,
      passWordSuccess: false,
      commitpswSuccess: false,
    });
    const route = useRoute();
    const router = useRouter();
    watch(
      () => userData.username,
      (newValue) => {
        let patt = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!patt.test(newValue)) {
          userNameTips.value = "支持字母，数字，下划线，减号";
          isSuccess.userNameSuccess = false;
        } else {
          userNameTips.value = "";
          isSuccess.userNameSuccess = true;
        }
      }
    );
    watch(
      () => userData.password,
      (newValue) => {
        let patt = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (!patt.test(newValue)) {
          passwordTips.value = "您的密码强度不够";
          isSuccess.passWordSuccess = false;
        } else {
          passwordTips.value = "";
          isSuccess.passWordSuccess = true;
        }
      }
    );
    watch(commitpsw, (newValue) => {
      if (newValue === userData.password && isSuccess.passWordSuccess) {
        isSuccess.commitpswSuccess = true;
        commitpswTips.value = "";
      } else {
        isSuccess.commitpswSuccess = false;
        commitpswTips.value = "您的密码不匹配";
      }
    });
    //注册
    var userRegister = (e) => {
      if (
        isSuccess.userNameSuccess &&
        isSuccess.passWordSuccess &&
        isSuccess.commitpswSuccess
      ) {
        let rawData = toRaw(userData);
        axios
          .post("http://localhost:3000/api/register", rawData)
          .then((res) => {
            if (res.data.code === 200) {
              console.log(res);
              sessionStorage.setItem("sid", res.data.data.user.id);
              router.push({ name: "index" });
            }
          })
          .catch((err) => {
            userNameTips.value = "用户名已存在";
            isSuccess.userNameSuccess = false;
            console.log(err);
          });
      } else {
        e.preventDefault();
        if (!userData.username) {
          userNameTips.value = "用户名不能为空";
        }
        if (!userData.password) {
          passwordTips.value = "密码不能为空";
        }
      }
    };

    //登陆
    var userLogin = () => {
      let rawData = toRaw(userData);
      axios
        .post("http://localhost:3000/api/login", rawData)
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res);
            sessionStorage.setItem("sid", res.data.data.user.id);
            router.push({ name: "index" });
          } else {
            passwordTips.value = "登陆失败，密码错误";
          }
        })
        .catch((err) => {
          console.log("用户不存在");
          userNameTips.value = "该用户不存在";
        });
    };
    return {
      isLogin,
      userNameTips,
      passwordTips,
      commitpswTips,
      commitpsw,
      showcommitpsw,
      userRegister,
      userLogin,
      ...toRefs(imgUrl),
      ...toRefs(isSuccess),
      ...toRefs(userData),
    };
  },
};
</script>

<style lang='less' scoped>
/* logo动画 */
@keyframes logomove {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 21%;
    opacity: 1;
  }
}
@keyframes interfacemove {
  from {
    top: 50%;
    opacity: 0;
  }
  to {
    top: 30%;
    opacity: 1;
  }
}
.el-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: var(--loginBg-color);
  .logo {
    position: absolute;
    top: -100px;
    width: 275px;
    height: 75px;
    margin: 0px 62.5px 0px;
    z-index: 10;
    animation-name: logomove;
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
    img {
      width: 100%;
    }
  }
  .interface {
    position: absolute;
    top: 25%;
    width: 400px;
    height: 400px;
    background-color: var(--interfaceBg-color);
    border-radius: 50px;
    box-shadow: 40px 40px 80px #bebebe, -40px -40px 80px #ffffff;
    animation-name: interfacemove;
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
    .choiceBox {
      margin: 15px 0;
      .loginBox,
      .registerBox {
        display: inline-block;
        width: 90px;
        height: 45px;
        margin: 35px 0px 0px;
        margin-left: 70px;
        line-height: 45px;
        text-align: center;
        p {
          font-size: 32px;
          cursor: pointer;
        }
      }
      .active {
        color: var(--active-color);
      }
    }
    .loginPage {
      display: block;
      margin-top: 40px;
      .loginForm {
        margin-top: 60px;
      }
      .registerForm {
        margin-top: 40px;
      }
      img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        vertical-align: bottom;
      }
      .usernameBox,
      .passwordBox {
        position: relative;
        width: 230px;
        margin: 20px 85px;
        .tips {
          position: absolute;
          left: 25%;
          font-size: 12px;
          color: var(--tips-color);
        }
        .icon-chenggong {
          position: absolute;
          top: 30%;
          left: 86%;
          color: var(--icon-color);
        }
      }
      #login-username,
      #login-password {
        width: 175px;
        height: 35px;
        border: 1.5px solid var(--input-color);
        text-indent: 1em;
      }
      #submit {
        width: 160px;
        height: 40px;
        margin: 20px 120px;
        font-size: 20px;
        border-radius: 18px;
        border: 1px solid var(--submit-border);
        background-color: var(--submitBg-color);
      }
    }
  }
}
</style>