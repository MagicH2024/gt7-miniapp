import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { tracks } from '../../data/tracks'
import './tracks.scss'

const difficultyColor: Record<string, string> = {
  '入门': '#4caf50',
  '进阶': '#ff9800',
  '高级': '#f44336'
}

export default function Tracks() {
  const [filter, setFilter] = useState('')

  const filtered = tracks.filter(t => {
    if (!filter) return true
    const q = filter.toLowerCase()
    return (
      t.nameZh.includes(q) ||
      t.nameEn.toLowerCase().includes(q) ||
      t.regionZh.includes(q)
    )
  })

  const handleTap = (id: string) => {
    Taro.navigateTo({ url: `/pages/track-detail/track-detail?id=${id}` })
  }

  return (
    <View className='tracks-page'>
      <View className='search-bar'>
        <Input
          className='search-input'
          placeholder='搜索赛道名 / 地区'
          value={filter}
          onInput={e => setFilter(e.detail.value)}
        />
      </View>

      <View className='track-count'>
        <Text className='count-text'>共 {filtered.length} 条赛道</Text>
      </View>

      <View className='track-list'>
        {filtered.map(track => (
          <View
            key={track.id}
            className='track-card'
            onClick={() => handleTap(track.id)}
          >
            <View className='track-card-head'>
              <Text className='track-zh'>{track.nameZh}</Text>
              <View
                className='difficulty-badge'
                style={{ backgroundColor: difficultyColor[track.difficulty] || '#888' }}
              >
                <Text className='difficulty-text'>{track.difficulty}</Text>
              </View>
            </View>
            <Text className='track-en'>{track.nameEn}</Text>
            <Text className='track-loc'>{track.regionZh}</Text>
            <View className='track-stats'>
              <Text className='stat'>📐 {track.lengthKm}</Text>
              <Text className='stat'>🔄 {track.cornerCount}</Text>
              <Text className='stat'>⏱️ {track.referenceLap}</Text>
            </View>
            <View className='feature-tags'>
              {track.features.slice(0, 3).map((f, i) => (
                <Text key={i} className='feature-tag'>{f}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
