import type { Tire } from './types'

export const tires: Tire[] = [
  {
    id: 'racing-hard',
    name: 'Racing Hard',
    shortName: 'RH',
    color: '#f8fafc',
    colorName: '白色',
    surface: 'dry',
    grip: '中',
    wear: '低',
    description: '耐久优先，适合长距离和需要控制轮胎衰减的比赛。'
  },
  {
    id: 'racing-medium',
    name: 'Racing Medium',
    shortName: 'RM',
    color: '#facc15',
    colorName: '黄色',
    surface: 'dry',
    grip: '高',
    wear: '中',
    description: '抓地和耐久平衡，适合作为默认基准胎。'
  },
  {
    id: 'racing-soft',
    name: 'Racing Soft',
    shortName: 'RS',
    color: '#ef4444',
    colorName: '红色',
    surface: 'dry',
    grip: '很高',
    wear: '高',
    description: '单圈抓地优先，轮胎温度和磨耗需要更谨慎管理。'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    shortName: 'IM',
    color: '#22c55e',
    colorName: '绿色',
    surface: 'wet',
    grip: '湿地中高',
    wear: '中',
    description: '适合小雨或半干半湿路面，干地长跑会快速磨损。'
  },
  {
    id: 'heavy-wet',
    name: 'Heavy Wet',
    shortName: 'W',
    color: '#3b82f6',
    colorName: '蓝色',
    surface: 'wet',
    grip: '雨地高',
    wear: '中',
    description: '适合大雨和积水路面，干地不建议使用。'
  }
]
