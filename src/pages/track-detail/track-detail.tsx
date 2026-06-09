import { View, Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { tracks } from '../../data/tracks'
import './track-detail.scss'

export default function TrackDetail() {
  const router = useRouter()
  const id = router.params.id
  const track = tracks.find(t => t.id === id)

  if (!track) {
    return (
      <View className='track-detail-page'>
        <Text className='not-found'>赛道数据未找到</Text>
      </View>
    )
  }

  return (
    <View className='track-detail-page'>
      <View className='detail-header'>
        <Text className='detail-zh'>{track.nameZh}</Text>
        <Text className='detail-en'>{track.nameEn}</Text>
        <Text className='detail-loc'>{track.regionZh}</Text>
      </View>

      <View className='stats-row'>
        <View className='stat-box'>
          <Text className='stat-label'>长度</Text>
          <Text className='stat-value'>{track.lengthKm}</Text>
        </View>
        <View className='stat-box'>
          <Text className='stat-label'>弯角</Text>
          <Text className='stat-value'>{track.cornerCount}</Text>
        </View>
        <View className='stat-box'>
          <Text className='stat-label'>参考圈速</Text>
          <Text className='stat-value'>{track.referenceLap}</Text>
        </View>
        <View className='stat-box'>
          <Text className='stat-label'>难度</Text>
          <Text className='stat-value'>{track.difficulty}</Text>
        </View>
      </View>

      <View className='section'>
        <Text className='section-title'>🏷️ 赛道特点</Text>
        <View className='tag-list'>
          {track.features.map((f, i) => (
            <Text key={i} className='tag-item'>{f}</Text>
          ))}
        </View>
      </View>

      <View className='section'>
        <Text className='section-title'>🎯 练习重点</Text>
        {track.practiceFocus.map((f, i) => (
          <View key={i} className='focus-item'>
            <Text className='focus-num'>{i + 1}</Text>
            <Text className='focus-text'>{f}</Text>
          </View>
        ))}
      </View>

      <View className='section'>
        <Text className='section-title'>💡 调车提示</Text>
        <View className='tip-card'>
          <Text className='tip-line'>• 高速弯多的赛道 → 增加下压力</Text>
          <Text className='tip-line'>• 刹车区重的赛道 → 调硬前悬挂</Text>
          <Text className='tip-line'>• 低速弯多的赛道 → 优化加速牵引力</Text>
          <Text className='tip-line'>• 高低差大的赛道 → 注意悬挂行程</Text>
        </View>
      </View>
    </View>
  )
}
