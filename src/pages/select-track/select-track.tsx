import { View, Text, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { tracks } from '../../data/tracks'
import { getRecentTracks, addRecentTrack } from '../../utils/storage'
import './select-track.scss'

function unique<T>(arr: T[]): T[] { return Array.from(new Set(arr)) }

export default function SelectTrack() {
  const [keyword, setKeyword] = useState('')
  const [regionFilter, setRegionFilter] = useState('全部')
  const [selectedId, setSelectedId] = useState('')
  const [recentTracks, setRecentTracks] = useState<typeof tracks>([])

  const regions = ['全部', ...unique(tracks.map(t => t.regionZh))]
  const popularTracks = tracks.filter(t => t.tags.includes('popular'))

  useDidShow(() => {
    const id = Taro.getStorageSync('selectedTrackId') || tracks[0].id
    setSelectedId(id)
    const recentIds = getRecentTracks()
    setRecentTracks(recentIds.map(rid => tracks.find(t => t.id === rid)).filter(Boolean) as typeof tracks)
  })

  const visibleTracks = tracks.filter(track => {
    const regionOk = regionFilter === '全部' || track.regionZh === regionFilter
    const text = [track.nameZh, track.nameEn, track.regionZh, track.regionEn, ...track.tags, ...track.layouts].join(' ').toLowerCase()
    const kwOk = !keyword || text.includes(keyword.toLowerCase())
    return regionOk && kwOk
  })

  const handleSelect = (id: string) => {
    addRecentTrack(id)
    Taro.setStorageSync('selectedTrackId', id)
    Taro.navigateBack()
  }

  return (
    <View className='select-page'>
      <View className='page-header'>
        <Text className='eyebrow'>SELECT TRACK</Text>
        <Text className='page-title'>选择赛道</Text>
      </View>

      <View className='search-box'>
        <Input
          className='search-input'
          value={keyword}
          placeholder='搜索赛道 / 地区 / 高速 / 轮胎'
          onInput={e => setKeyword(e.detail.value)}
        />
      </View>

      {recentTracks.length > 0 && (
        <>
          <Text className='section-label'>最近使用</Text>
          <View className='tag-list'>
            {recentTracks.map(track => (
              <View key={track.id} className={`compact-tag ${selectedId === track.id ? 'selected' : ''}`} onClick={() => handleSelect(track.id)}>
                <Text>{track.nameZh}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <Text className='section-label'>常用赛道</Text>
      <View className='popular-grid'>
        {popularTracks.map(track => (
          <View key={track.id} className={`popular-card ${selectedId === track.id ? 'selected' : ''}`} onClick={() => handleSelect(track.id)}>
            <Text className='popular-name'>{track.nameZh}</Text>
            <Text className='popular-meta'>{track.nameEn}</Text>
          </View>
        ))}
      </View>

      <Text className='section-label'>地区分类</Text>
      <View className='tag-list'>
        {regions.map(r => (
          <View key={r} className={`brand-chip ${regionFilter === r ? 'active' : ''}`} onClick={() => setRegionFilter(r)}>
            <Text>{r}</Text>
          </View>
        ))}
      </View>

      <Text className='section-label'>全部赛道</Text>
      {visibleTracks.map(track => (
        <View key={track.id} className={`track-card ${selectedId === track.id ? 'selected' : ''}`} onClick={() => handleSelect(track.id)}>
          <View className='track-head'>
            <Text className='track-name'>{track.nameZh}</Text>
            {selectedId === track.id && <Text className='current-badge'>当前</Text>}
          </View>
          <Text className='track-meta'>{track.nameEn} · {track.regionZh}</Text>
          <View className='track-tags'>
            {track.layouts.map(l => <Text key={l} className='tag tag-red'>{l}</Text>)}
            {track.tags.slice(0, 3).map(t => <Text key={t} className='tag'>{t}</Text>)}
          </View>
        </View>
      ))}
    </View>
  )
}
