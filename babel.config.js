// babel-preset-taro 在 taro 项目中负责处理 JSX 转换、API polyfill 等。
// 一般不需要额外配置，保持默认即可。
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ]
}
