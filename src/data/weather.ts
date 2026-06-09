import type { WeatherRules } from './types'

export const weatherRules: WeatherRules = {
  options: [
    {
      id: 'dry',
      name: '干地',
      code: 'DRY',
      description: '标准干地设定，优先圈速、尾速和轮胎效率。',
      aeroDelta: 0,
      brakeBiasDelta: 0,
      stabilityNote: '干地不需要额外保守设置，可根据赛道特性追求效率。'
    },
    {
      id: 'rain',
      name: '雨战',
      code: 'WET',
      description: '雨地或可能转湿的比赛，优先稳定、轮胎排水和制动容错。',
      aeroDelta: 14,
      brakeBiasDelta: -2,
      stabilityNote: '雨战建议增加下压力并降低攻击性，避免压路肩和突然全油。'
    }
  ],
  tireWarnings: {
    dry: {
      intermediate: '干地使用 Intermediate 会快速磨耗，只建议赛道即将转湿时过渡使用。',
      'heavy-wet': '干地使用 Heavy Wet 会明显牺牲抓地和耐久，不建议作为默认方案。'
    },
    rain: {
      'racing-hard': '小雨使用光头胎风险较高，低速牵引和重刹区要保守。',
      'racing-medium': '小雨使用光头胎需要确认赛道水量，湿线会明显放大失误。',
      'racing-soft': '雨战使用 Racing Soft 单圈可能快，但积水区风险很高。'
    }
  }
}
