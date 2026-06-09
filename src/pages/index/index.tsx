import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import './index.scss'

export default function Index() {
  useEffect(() => {
    // 自动跳转到 tabBar 首页
    setTimeout(() => {
      Taro.switchTab({ url: '/pages/tuning/tuning' })
    }, 800)
  }, [])

  return (
    <View className='splash-page'>
      <Text className='splash-icon'>🏎️</Text>
      <Text className='splash-title'>GT7 调车车库</Text>
      <Text className='splash-sub'>V0.2 · 加载中...</Text>
    </View>
  )
}
