import { View, Text, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { cars } from '../../data/cars'
import { getRecentCars, addRecentCar } from '../../utils/storage'
import './select-car.scss'

function unique<T>(arr: T[]): T[] { return Array.from(new Set(arr)) }

export default function SelectCar() {
  const [keyword, setKeyword] = useState('')
  const [brandFilter, setBrandFilter] = useState('全部')
  const [selectedId, setSelectedId] = useState('')
  const [recentCars, setRecentCars] = useState<typeof cars>([])

  const brands = ['全部', ...unique(cars.map(c => c.brandZh))]
  const hotCars = cars.filter(c => c.tags.includes('hot'))

  useDidShow(() => {
    const id = Taro.getStorageSync('selectedCarId') || cars[0].id
    setSelectedId(id)
    const recentIds = getRecentCars()
    setRecentCars(recentIds.map(rid => cars.find(c => c.id === rid)).filter(Boolean) as typeof cars)
  })

  const visibleCars = cars.filter(car => {
    const brandOk = brandFilter === '全部' || car.brandZh === brandFilter
    const text = [car.nameEn, car.nameZh, car.brandEn, car.brandZh, car.category, car.drivetrain, ...car.tags].join(' ').toLowerCase()
    const kwOk = !keyword || text.includes(keyword.toLowerCase())
    return brandOk && kwOk
  })

  const handleSelect = (id: string) => {
    addRecentCar(id)
    Taro.setStorageSync('selectedCarId', id)
    Taro.navigateBack()
  }

  return (
    <View className='select-page'>
      <View className='page-header'>
        <Text className='eyebrow'>SELECT CAR</Text>
        <Text className='page-title'>选择车辆</Text>
      </View>

      <View className='search-box'>
        <Input
          className='search-input'
          value={keyword}
          placeholder='搜索车辆 / 品牌 / Gr.3 / AWD'
          onInput={e => setKeyword(e.detail.value)}
        />
      </View>

      {recentCars.length > 0 && (
        <>
          <Text className='section-label'>最近使用</Text>
          <View className='tag-list'>
            {recentCars.map(car => (
              <View key={car.id} className={`compact-tag ${selectedId === car.id ? 'selected' : ''}`} onClick={() => handleSelect(car.id)}>
                <Text>{car.nameEn}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <Text className='section-label'>热门车辆</Text>
      <View className='hot-grid'>
        {hotCars.map(car => (
          <View key={car.id} className={`hot-card ${selectedId === car.id ? 'selected' : ''}`} onClick={() => handleSelect(car.id)}>
            <Text className='hot-name'>{car.nameEn}</Text>
            <Text className='hot-meta'>{car.category} · {car.drivetrain}</Text>
          </View>
        ))}
      </View>

      <Text className='section-label'>品牌分类</Text>
      <View className='tag-list'>
        {brands.map(b => (
          <View key={b} className={`brand-chip ${brandFilter === b ? 'active' : ''}`} onClick={() => setBrandFilter(b)}>
            <Text>{b}</Text>
          </View>
        ))}
      </View>

      <Text className='section-label'>全部车辆</Text>
      {visibleCars.map(car => (
        <View key={car.id} className={`car-card ${selectedId === car.id ? 'selected' : ''}`} onClick={() => handleSelect(car.id)}>
          <View className='car-head'>
            <Text className='car-name'>{car.nameEn}</Text>
            {selectedId === car.id && <Text className='current-badge'>当前</Text>}
          </View>
          <Text className='car-meta'>{car.nameZh} · {car.brandZh}</Text>
          <View className='car-tags'>
            <Text className='tag tag-red'>PP {car.ppBase}</Text>
            <Text className='tag'>{car.category}</Text>
            <Text className='tag'>{car.drivetrain}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}
