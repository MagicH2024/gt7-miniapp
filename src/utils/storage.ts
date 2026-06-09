import Taro from '@tarojs/taro'
import type { GarageRecord } from '../data/types'

const GARAGE_KEY = 'gt7_garage'
const RECENT_CARS_KEY = 'gt7_recent_cars'
const RECENT_TRACKS_KEY = 'gt7_recent_tracks'

/* ==============================
   车库（收藏方案）
   ============================== */

export function getGarage(): GarageRecord[] {
  try {
    return Taro.getStorageSync(GARAGE_KEY) || []
  } catch {
    return []
  }
}

export function addToGarage(record: GarageRecord): void {
  const list = getGarage()
  list.unshift(record)
  Taro.setStorageSync(GARAGE_KEY, list)
}

export function removeFromGarage(id: string): void {
  const list = getGarage().filter((item) => item.id !== id)
  Taro.setStorageSync(GARAGE_KEY, list)
}

export function clearGarage(): void {
  Taro.removeStorageSync(GARAGE_KEY)
}

/* ==============================
   最近使用的车辆
   ============================== */

export function getRecentCars(): string[] {
  try {
    return Taro.getStorageSync(RECENT_CARS_KEY) || []
  } catch {
    return []
  }
}

export function addRecentCar(carId: string): void {
  const ids = getRecentCars().filter((id) => id !== carId)
  ids.unshift(carId)
  Taro.setStorageSync(RECENT_CARS_KEY, ids.slice(0, 5))
}

/* ==============================
   最近使用的赛道
   ============================== */

export function getRecentTracks(): string[] {
  try {
    return Taro.getStorageSync(RECENT_TRACKS_KEY) || []
  } catch {
    return []
  }
}

export function addRecentTrack(trackId: string): void {
  const ids = getRecentTracks().filter((id) => id !== trackId)
  ids.unshift(trackId)
  Taro.setStorageSync(RECENT_TRACKS_KEY, ids.slice(0, 5))
}

/* ==============================
   通用工具
   ============================== */

export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}`
}
