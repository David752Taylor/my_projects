<template>
  <div class="login">
    <!-- 头部导航栏 -->
    <van-nav-bar
    title="会员登录"
    left-text="返回"
    right-text="注册"
    left-arrow
    @click-left="$router.go(-1)"
    @click-right="onClickRight"
    />

    <!-- 内容区域 -->
    <div class="container">

      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机" type="text" v-model="mobile">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形码" type="text" v-model="picCode">
          <img v-if="picURL" :src="picURL" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="msgCode">
          <button @click="getCode">{{ second === totalSecond? '获取验证码': second + '秒后重新发送'  }}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'

export default {
  name: 'LoginPage',
  data () {
    return {
      picURL: '', // @/assets/code.png
      picCode: '', // 图形验证码
      picKey: '', // 图形验证码唯一标识
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器id
      mobile: '15751776629', // 手机号
      msgCode: '246810' // 短信验证码
    }
  },
  methods: {
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    },
    async getPicCode () {
      console.log(await getPicCode())
      const { data: { base64, key } } = await getPicCode()
      this.picURL = base64
      this.picKey = key
      this.$toast.success('图形码已刷新')
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('手机号格式有误')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('图形码格式有误')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        console.log(res)
        if (res.status === 200) {
          this.$toast('短信发送成功，请注意查收')
        }

        // 开启倒计时
        console.log(1)
        this.timer = setInterval(() => {
          this.second--
          if (!this.second) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('手机验证码有误')
        return
      }

      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      const url = this.$route.query.backUrl ? this.$route.query.backUrl : '/'
      this.$router.replace(url)
    }
  },
  created () {
    this.getPicCode()
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
