// postcss.config.js
module.exports = {
  plugins: {
    // vw适配的标准屏的宽度（iPhoneX）
    'postcss-px-to-viewport': {
      // 设计图的宽度，可调整
      viewportWidth: 375
    }
  }
}
