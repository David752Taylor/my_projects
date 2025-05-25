import request from '@/utils/request'

export const getPicCode = () => {
  console.log('10-获取图形验证码响应')
  return request.get('captcha/image')
}

export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  console.log('11-登录(获取短信验证码)响应')
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

export const codeLogin = (mobile, smsCode) => {
  console.log('12-手机验证码登录(图形验证码可以不用传)响应')
  return request.post('passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
