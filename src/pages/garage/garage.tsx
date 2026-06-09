import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { getGarage, clearGarage } from '../../utils/storage'
import type { GarageRecord } from '../../data/types'
import './garage.scss'

export default function Garage() {
  const [setups, setSetups] = useState<GarageRecord[]>([])

  useDidShow(() => {
    setSetups(getGarage())
  })

  const handleClear = () => {
    Taro.showModal({
      title: '清空车库',
      content: '确定删除所有收藏方案吗？',
      success: (res) => {
        if (res.confirm) {
          clearGarage()
          setSetups([])
          Taro.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  }

  if (setups.length === 0) {
    return (
      <View className='garage-page'>
        <View className='empty-state'>
          <Text className='empty-icon'>🏎️</Text>
          <Text className='empty-title'>还没有收藏调校表</Text>
          <Text className='empty-desc'>从首页选择「生成调校」，完成车辆、赛道、PP、天气和轮胎后收藏。</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='garage-page'>
      <View className='garage-header'>
        <Text className='garage-count'>已收藏 {setups.length} 套方案</Text>
      </View>

      {setups.map(item => (
        <View key={item.id} className='garage-card'>
          <Text className='garage-title'>{item.title}</Text>
          <Text className='garage-subtitle'>{item.subtitle}</Text>
          <View className='garage-tags'>
            <Text className='tag tag-red'>本地规则</Text>
            <Text className='tag'>{item.createdAt}</Text>
          </View>
          <Text className='garage-objective'>{item.setup.objective}</Text>
        </View>
      ))}

      <View className='clear-btn' onClick={handleClear}>
        <Text className='clear-text'>清空车库</Text>
      </View>
    </View>
  )
}
