import { View, Text, Picker } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { tracks } from '../../data/tracks'
import { carClasses, drivetrains, weathers, problems } from '../../data/tuning-rules'
import type { CarClass, Drivetrain, Weather, CarProblem } from '../../data/types'
import './tuning.scss'

const classLabels = carClasses.map(c => c)
const driveLabels = drivetrains.map(d => {
  const map: Record<Drivetrain, string> = { FF: 'FF 前置前驱', FR: 'FR 前置后驱', MR: 'MR 中置后驱', AWD: 'AWD 四驱' }
  return map[d]
})
const weatherLabels = weathers.map(w => w)
const problemLabels = problems.map(p => p)
const trackLabels = tracks.map(t => `${t.trackNameZh} (${t.trackName})`)

export default function Tuning() {
  const [classIdx, setClassIdx] = useState(0)
  const [driveIdx, setDriveIdx] = useState(1)
  const [trackIdx, setTrackIdx] = useState(0)
  const [weatherIdx, setWeatherIdx] = useState(0)
  const [problemIdx, setProblemIdx] = useState(0)

  const handleSubmit = () => {
    const params = {
      carClass: carClasses[classIdx],
      drivetrain: drivetrains[driveIdx],
      trackSlug: tracks[trackIdx].slug,
      weather: weathers[weatherIdx],
      problem: problems[problemIdx]
    }
    const qs = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')
    Taro.navigateTo({ url: `/pages/result/result?${qs}` })
  }

  return (
    <View className='tuning-page'>
      <View className='page-header'>
        <Text className='page-icon'>🔧</Text>
        <Text className='page-title'>调车助手</Text>
        <Text className='page-desc'>选择车辆和问题，生成智能调车建议</Text>
      </View>

      <View className='form-card'>
        <View className='form-item'>
          <Text className='form-label'>车辆级别</Text>
          <Picker mode='selector' range={classLabels} value={classIdx} onChange={e => setClassIdx(Number(e.detail.value))}>
            <View className='form-picker'>
              <Text className='picker-value'>{carClasses[classIdx]}</Text>
              <Text className='picker-arrow'>▼</Text>
            </View>
          </Picker>
        </View>

        <View className='form-item'>
          <Text className='form-label'>驱动形式</Text>
          <Picker mode='selector' range={driveLabels} value={driveIdx} onChange={e => setDriveIdx(Number(e.detail.value))}>
            <View className='form-picker'>
              <Text className='picker-value'>{driveLabels[driveIdx]}</Text>
              <Text className='picker-arrow'>▼</Text>
            </View>
          </Picker>
        </View>

        <View className='form-item'>
          <Text className='form-label'>赛道</Text>
          <Picker mode='selector' range={trackLabels} value={trackIdx} onChange={e => setTrackIdx(Number(e.detail.value))}>
            <View className='form-picker'>
              <Text className='picker-value'>{trackLabels[trackIdx]}</Text>
              <Text className='picker-arrow'>▼</Text>
            </View>
          </Picker>
        </View>

        <View className='form-item'>
          <Text className='form-label'>天气</Text>
          <Picker mode='selector' range={weatherLabels} value={weatherIdx} onChange={e => setWeatherIdx(Number(e.detail.value))}>
            <View className='form-picker'>
              <Text className='picker-value'>{weatherLabels[weatherIdx]}</Text>
              <Text className='picker-arrow'>▼</Text>
            </View>
          </Picker>
        </View>

        <View className='form-item'>
          <Text className='form-label'>当前问题</Text>
          <Picker mode='selector' range={problemLabels} value={problemIdx} onChange={e => setProblemIdx(Number(e.detail.value))}>
            <View className='form-picker'>
              <Text className='picker-value'>{problemLabels[problemIdx]}</Text>
              <Text className='picker-arrow'>▼</Text>
            </View>
          </Picker>
        </View>
      </View>

      <View className='submit-btn' onClick={handleSubmit}>
        <Text className='submit-text'>🚀 生成调车建议</Text>
      </View>
    </View>
  )
}
