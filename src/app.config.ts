export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/tuning/tuning',
    'pages/select-car/select-car',
    'pages/select-track/select-track',
    'pages/result/result',
    'pages/tracks/tracks',
    'pages/track-detail/track-detail',
    'pages/garage/garage',
    'pages/glossary/glossary'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#0b0f17',
    navigationBarTitleText: 'GT7 调车助手',
    navigationBarTextStyle: 'white',
    backgroundColor: '#0b0f17'
  },
  tabBar: {
    color: '#64748b',
    selectedColor: '#e62525',
    backgroundColor: '#0b0f17',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/tuning/tuning',
        text: '生成'
      },
      {
        pagePath: 'pages/tracks/tracks',
        text: '赛道'
      },
      {
        pagePath: 'pages/garage/garage',
        text: '车库'
      },
      {
        pagePath: 'pages/glossary/glossary',
        text: '词典'
      }
    ]
  }
})
