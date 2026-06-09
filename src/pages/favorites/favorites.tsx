import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { getFavorites, removeFavorite } from '../../utils/storage'
import type { FavoriteRecord } from '../../data/types'
import './favorites.scss'

export default function Favorites() {
  const [list, setList] = useState<FavoriteRecord[]>([])

  useDidShow(() => {
    setList(getFavorites())
  })

  const handleDelete = (id: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这条收藏吗？',
      success: (res) => {
        if (res.confirm) {
          removeFavorite(id)
          setList(getFavorites())
          Taro.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts)
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  if (list.length === 0) {
    return (
      <View className='favorites-page'>
        <View className='empty-state'>
          <Text className='empty-icon'>⭐</Text>
          <Text className='empty-title'>暂无收藏</Text>
          <Text className='empty-desc'>在调车结果页点击「收藏」按钮保存方案</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='favorites-page'>
      <View className='fav-count'>
        <Text className='count-text'>共 {list.length} 条收藏</Text>
      </View>

      <View className='fav-list'>
        {list.map(item => (
          <View key={item.id} className='fav-card'>
            <View className='fav-head'>
              <Text className='fav-title'>{item.result.title}</Text>
              <Text className='fav-time'>{formatTime(item.createdAt)}</Text>
            </View>
            <View className='fav-meta'>
              <Text className='meta-tag'>{item.request.carClass}</Text>
              <Text className='meta-tag'>{item.request.drivetrain}</Text>
              <Text className='meta-tag'>{item.request.weather}</Text>
              <Text className='meta-tag'>{item.trackNameZh}</Text>
            </View>
            <View className='fav-advice'>
              {item.result.advice.slice(0, 3).map((a, i) => (
                <Text key={i} className='advice-line'>• {a.parameter}：{a.direction}</Text>
              ))}
              {item.result.advice.length > 3 && (
                <Text className='advice-more'>...共 {item.result.advice.length} 条建议</Text>
              )}
            </View>
            <View className='fav-actions'>
              <View
                className='fav-btn delete-btn'
                onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
              >
                <Text>🗑️ 删除</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
