export default {
  data () {
    return {

    }
  },
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.alert({
          title: '温馨提示',
          message: '需要先登录才能继续操作',
          showCancelButton: true,
          confirmButtonText: '去登录',
          confirmButtonColor: 'blue',
          cancelButtonText: '再逛逛'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath // 保存地址，登录后回弹
            }
          })
        }).catch(() => {
        // on cancel
        })
        return true
      }
      return false
    }
  }
}
