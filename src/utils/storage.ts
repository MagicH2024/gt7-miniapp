import Taro from '@tarojs/taro'
import type { FavoriteRecord } from '../data/types'

const FAVORITES_KEY = 'gt7_favorites'

/** 获取所有收藏 */
export function getFavorites(): FavoriteRecord[] {
  try {
    return Taro.getStorageSync(FAVORITES_KEY) || []
  } catch {
    return []
  }
}

/** 添加收藏 */
export function addFavorite(record: FavoriteRecord): void {
  const list = getFavorites()
  list.unshift(record)
  Taro.setStorageSync(FAVORITES_KEY, list)
}

/** 删除收藏 */
export function removeFavorite(id: string): void {
  const list = getFavorites().filter((item) => item.id !== id)
  Taro.setStorageSync(FAVORITES_KEY, list)
}

/** 生成唯一 ID */
export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
