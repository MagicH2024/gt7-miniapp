import { View, Text, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { cars } from '../../data/cars'
import { tracks } from '../../data/tracks'
import { tires } from '../../data/tires'
import { weatherRules } from '../../data/weather'
import { getRecentCars, getRecentTracks } from '../../utils/storage'
import './tuning.scss'

export default function Tuning() {
  const [selectedCar, setSelectedCar] = useState(cars[0])
  const [selectedTrack, setSelectedTrack] = useState(tracks[0])
  const [selectedPp, setSelectedPp] = useState('700')
  const [customPp, setCustomPp] = useState('')
  const [useCustomPp, setUseCustomPp] = useState(false)
  const [selectedWeatherId, setSelectedWeatherId] = useState('dry')
  const [selectedTireId, setSelectedTireId] = useState('racing-medium')

  useDidShow(() => {
    const recentCarIds = getRecentCars()
    if (recentCarIds.length > 0) {
      const found = cars.find(c => c.id === recentCarIds[0])
      if (found) setSelectedCar(found)
    }
    const recentTrackIds = getRecentTracks()
    if (recentTrackIds.length > 0) {
      const found = tracks.find(t => t.id === recentTrackIds[0])
      if (found) setSelectedTrack(found)
    }
  })

  const ppOptions = ['500', '600', '700', '800']

  const handleSelectCar = () => {
    Taro.navigateTo({ url: '/pages/select-car/select-car' })
  }

  const handleSelectTrack = () => {
    Taro.navigateTo({ url: '/pages/select-track/select-track' })
  }

  const handleSelectWeather = (id: string) => {
    setSelectedWeatherId(id)
    if (id === 'rain') {
      setSelectedTireId('intermediate')
    } else {
      setSelectedTireId('racing-medium')
    }
  }

  const handleGenerate = () => {
    const pp = useCustomPp ? Number(customPp) : Number(selectedPp)
    if (!pp || pp < 300 || pp > 1200) {
      Taro.showToast({ title: '请输入 300-1200 的 PP', icon: 'none' })
      return
    }
    const qs = `carId=${selectedCar.id}&trackId=${selectedTrack.id}&targetPp=${pp}&weatherId=${selectedWeatherId}&tireId=${selectedTireId}`
    Taro.navigateTo({ url: `/pages/result/result?${qs}` })
  }

  return (
    <View className='tuning-page'>
      <View className='page-header'>
        <Text className='eyebrow'>GT7 TUNE GARAGE</Text>
        <Text className='page-title'>生成调校方案</Text>
      </View>

      <View className='console-card'>
        <View className='console-head'>
          <Text className='console-label'>当前输入</Text>
          <Text className='console-status'>READY</Text>
        </View>

        <View className='pick-card' onClick={handleSelectCar}>
          <View className='pick-top'>
            <Text className='pick-label'>车辆</Text>
            <Text className='pick-action'>更换</Text>
          </View>
          <Text className='pick-title'>{selectedCar.nameEn}</Text>
          <Text className='pick-meta'>{selectedCar.nameZh} · {selectedCar.brandZh} · {selectedCar.category} · {selectedCar.drivetrain}</Text>
        </View>

        <View className='pick-card' onClick={handleSelectTrack}>
          <View className='pick-top'>
            <Text className='pick-label'>赛道</Text>
            <Text className='pick-action'>更换</Text>
          </View>
          <Text className='pick-title'>{selectedTrack.nameZh}</Text>
          <Text className='pick-meta'>{selectedTrack.nameEn} · {selectedTrack.regionZh}</Text>
        </View>
      </View>

      <Text className='section-label'>目标 PP</Text>
      <View className='pp-grid'>
        {ppOptions.map(pp => (
          <View
            key={pp}
            className={`pp-btn ${!useCustomPp && selectedPp === pp ? 'active' : ''}`}
            onClick={() => { setSelectedPp(pp); setUseCustomPp(false) }}
          >
            <Text>{pp}</Text>
          </View>
        ))}
        <View
          className={`pp-btn ${useCustomPp ? 'active' : ''}`}
          onClick={() => setUseCustomPp(true)}
        >
          <Text>自定义</Text>
        </View>
      </View>
      {useCustomPp && (
        <View className='custom-pp'>
          <Text className='custom-pp-label'>自定义 PP</Text>
          <Input
            className='custom-pp-input'
            type='digit'
            value={customPp}
            placeholder='例如 730'
            onInput={e => setCustomPp(e.detail.value)}
          />
        </View>
      )}

      <Text className='section-label'>天气</Text>
      <View className='weather-grid'>
        {weatherRules.options.map(w => (
          <View
            key={w.id}
            className={`weather-btn ${selectedWeatherId === w.id ? 'active' : ''}`}
            onClick={() => handleSelectWeather(w.id)}
          >
            <Text>{w.name}</Text>
          </View>
        ))}
      </View>

      <Text className='section-label'>轮胎</Text>
      <View className='tire-grid'>
        {tires.map(t => (
          <View
            key={t.id}
            className={`tire-card ${selectedTireId === t.id ? 'active' : ''}`}
            style={{ borderColor: selectedTireId === t.id ? t.color : 'rgba(148,163,184,0.22)' }}
            onClick={() => setSelectedTireId(t.id)}
          >
            <View className='tire-color-bar' style={{ background: t.color }} />
            <View className='tire-info'>
              <Text className='tire-name'>{t.name}</Text>
              <Text className='tire-meta'>{t.shortName} · {t.colorName}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className='generate-btn' onClick={handleGenerate}>
        <Text className='generate-text'>生成调车方案</Text>
      </View>
    </View>
  )
}
