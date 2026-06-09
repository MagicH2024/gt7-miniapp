export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/tuning/tuning',
    'pages/result/result',
    'pages/tracks/tracks',
    'pages/track-detail/track-detail',
    'pages/favorites/favorites'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1a1a2e',
    navigationBarTitleText: 'GT7 调车助手',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#ff6b35',
    backgroundColor: '#1a1a2e',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/tracks/tracks',
        text: '赛道'
      },
      {
        pagePath: 'pages/favorites/favorites',
        text: '收藏'
      }
    ]
  }
})
