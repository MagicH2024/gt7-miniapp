import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const cards = [
  { title: '调车助手', desc: '根据车辆和问题生成调车建议', page: '/pages/tuning/tuning', icon: '🔧' },
  { title: '赛道训练', desc: '查看赛道数据和逐弯攻略', page: '/pages/tracks/tracks', icon: '🏁' },
  { title: '我的收藏', desc: '查看已收藏的调车方案', page: '/pages/favorites/favorites', icon: '⭐' }
]

export default function Index() {
  const handleTap = (page: string) => {
    Taro.navigateTo({ url: page })
  }

  return (
    <View className='index-page'>
      <View className='hero'>
        <Text className='hero-icon'>🏎️</Text>
        <Text className='hero-title'>GT7 调车助手</Text>
        <Text className='hero-desc'>Gran Turismo 7 智能调车 & 赛道训练</Text>
      </View>
      <View className='card-grid'>
        {cards.map((card) => (
          <View
            key={card.page}
            className='entry-card'
            onClick={() => handleTap(card.page)}
          >
            <Text className='card-icon'>{card.icon}</Text>
            <Text className='card-title'>{card.title}</Text>
            <Text className='card-desc'>{card.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
