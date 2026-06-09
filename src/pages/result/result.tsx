import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { generateTuningResult } from '../../data/tuning-rules'
import { tracks } from '../../data/tracks'
import { addFavorite, genId } from '../../utils/storage'
import type { CarClass, Drivetrain, Weather, CarProblem, TuningRequest } from '../../data/types'
import './result.scss'

export default function Result() {
  const router = useRouter()
  const params = router.params as {
    carClass: CarClass
    drivetrain: Drivetrain
    trackSlug: string
    weather: Weather
    problem: CarProblem
  }

  const result = generateTuningResult(
    params.carClass,
    params.drivetrain,
    params.weather,
    params.problem
  )

  const track = tracks.find(t => t.slug === params.trackSlug)
  const trackNameZh = track?.trackNameZh || params.trackSlug

  /** 复制建议到剪贴板 */
  const handleCopy = () => {
    const lines = [
      `【${result.title}】`,
      `车辆：${params.carClass} ${params.drivetrain}`,
      `赛道：${trackNameZh}`,
      `天气：${params.weather}`,
      `问题：${params.problem}`,
      '',
      '=== 调车建议 ===',
      ...result.advice.map(a => `• ${a.parameter}：${a.direction}（${a.reason}）`),
      '',
      '=== 驾驶建议 ===',
      ...result.drivingTips.map(t => `• ${t}`)
    ]
    Taro.setClipboardData({
      data: lines.join('\n'),
      success: () => Taro.showToast({ title: '已复制', icon: 'success' })
    })
  }

  /** 收藏到本地 */
  const handleFavorite = () => {
    const record = {
      id: genId(),
      createdAt: Date.now(),
      request: params,
      result,
      trackNameZh
    }
    addFavorite(record)
    Taro.showToast({ title: '已收藏', icon: 'success' })
  }

  return (
    <View className='result-page'>
      <View className='result-header'>
        <Text className='result-icon'>📋</Text>
        <Text className='result-title'>{result.title}</Text>
        <View className='result-meta'>
          <Text className='meta-tag'>{params.carClass}</Text>
          <Text className='meta-tag'>{params.drivetrain}</Text>
          <Text className='meta-tag'>{params.weather}</Text>
          <Text className='meta-tag'>{params.problem}</Text>
        </View>
        <Text className='result-track'>🏁 {trackNameZh}</Text>
      </View>

      <View className='section'>
        <Text className='section-title'>🔧 调车建议</Text>
        {result.advice.map((item, i) => (
          <View key={i} className='advice-card'>
            <View className='advice-head'>
              <Text className='advice-param'>{item.parameter}</Text>
              <Text className='advice-dir'>{item.direction}</Text>
            </View>
            <Text className='advice-reason'>{item.reason}</Text>
          </View>
        ))}
      </View>

      <View className='section'>
        <Text className='section-title'>🏁 驾驶建议</Text>
        {result.drivingTips.map((tip, i) => (
          <View key={i} className='tip-item'>
            <Text className='tip-num'>{i + 1}</Text>
            <Text className='tip-text'>{tip}</Text>
          </View>
        ))}
      </View>

      <View className='action-bar'>
        <View className='action-btn copy-btn' onClick={handleCopy}>
          <Text>📋 复制建议</Text>
        </View>
        <View className='action-btn fav-btn' onClick={handleFavorite}>
          <Text>⭐ 收藏</Text>
        </View>
      </View>
    </View>
  )
}
