import type { Car } from './types'

export const cars: Car[] = [
  {
    id: 'porsche-911-rsr-17',
    nameEn: "Porsche 911 RSR '17",
    nameZh: "保时捷 911 RSR '17",
    brandEn: 'Porsche',
    brandZh: '保时捷',
    category: 'Gr.3',
    drivetrain: 'MR',
    tags: ['hot', 'gr3', 'mid-engine', 'stable'],
    ppBase: 730
  },
  {
    id: 'toyota-gr-supra-racing-concept-18',
    nameEn: 'Toyota GR Supra Racing Concept \'18',
    nameZh: '丰田 GR Supra Racing Concept \'18',
    brandEn: 'Toyota',
    brandZh: '丰田',
    category: 'Gr.3',
    drivetrain: 'FR',
    tags: ['hot', 'gr3', 'front-engine', 'traction'],
    ppBase: 730
  },
  {
    id: 'nissan-gtr-nismo-gt3-18',
    nameEn: 'Nissan GT-R NISMO GT3 \'18',
    nameZh: '日产 GT-R NISMO GT3 \'18',
    brandEn: 'Nissan',
    brandZh: '日产',
    category: 'Gr.3',
    drivetrain: 'FR',
    tags: ['gr3', 'front-engine', 'stable'],
    ppBase: 730
  },
  {
    id: 'mercedes-amg-gt3-20',
    nameEn: 'Mercedes-AMG GT3 \'20',
    nameZh: '梅赛德斯-AMG GT3 \'20',
    brandEn: 'Mercedes-AMG',
    brandZh: '梅赛德斯-AMG',
    category: 'Gr.3',
    drivetrain: 'FR',
    tags: ['hot', 'gr3', 'front-engine', 'endurance'],
    ppBase: 730
  },
  {
    id: 'ferrari-296-gt3-23',
    nameEn: 'Ferrari 296 GT3 \'23',
    nameZh: '法拉利 296 GT3 \'23',
    brandEn: 'Ferrari',
    brandZh: '法拉利',
    category: 'Gr.3',
    drivetrain: 'MR',
    tags: ['hot', 'gr3', 'mid-engine', 'responsive'],
    ppBase: 730
  },
  {
    id: 'xiaomi-su7-ultra-25',
    nameEn: 'Xiaomi SU7 Ultra \'25',
    nameZh: '小米 SU7 Ultra \'25',
    brandEn: 'Xiaomi',
    brandZh: '小米',
    category: '中国车',
    drivetrain: 'AWD',
    tags: ['hot', 'china', 'ev', 'awd', 'high-power'],
    ppBase: 900
  },
  {
    id: 'yangwang-u9-24',
    nameEn: 'Yangwang U9 \'24',
    nameZh: '仰望 U9 \'24',
    brandEn: 'Yangwang',
    brandZh: '仰望',
    category: '中国车',
    drivetrain: 'AWD',
    tags: ['china', 'ev', 'awd', 'high-power'],
    ppBase: 880
  }
]
