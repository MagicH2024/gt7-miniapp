import type { CarProblem, ProblemTuningResult } from './types'

/** 所有可选问题 */
export const problems: CarProblem[] = [
  '转向不足',
  '转向过度',
  '刹车不稳',
  '直道速度慢',
  '弯道速度慢',
  '车身不稳定',
  '轮胎磨损快'
]

/** 根据问题类型生成建议 */
export function generateProblemAdvice(problem: CarProblem): ProblemTuningResult {
  switch (problem) {
    case '转向不足':
      return {
        title: '转向不足（推头）调车建议',
        advice: [
          { parameter: '前下压力', direction: '增加 1-2 格', reason: '增加前轴下压力提升前轮抓地力' },
          { parameter: '前防倾杆', direction: '调软 1-2 格', reason: '软化前轴让前轮更好地贴合地面' },
          { parameter: '后防倾杆', direction: '调硬 1 格', reason: '增加后轴刚性帮助车头转入弯道' }
        ],
        drivingTips: [
          '入弯前充分减速，不要带着重刹车进弯',
          '使用晚 Apex 走线，给车头更多时间转向',
          '出弯时等车头指准方向再给油'
        ]
      }
    case '转向过度':
      return {
        title: '转向过度（甩尾）调车建议',
        advice: [
          { parameter: '后下压力', direction: '增加 1-2 格', reason: '增加后轴下压力提升后轮稳定性' },
          { parameter: '后防倾杆', direction: '调软 1-2 格', reason: '软化后轴让后轮更好地贴合地面' },
          { parameter: '前防倾杆', direction: '调硬 1 格', reason: '增加前轴刚性稳定车头' }
        ],
        drivingTips: [
          '出弯时渐进给油，不要突然全油',
          '入弯时保持稳定，不要突然打方向',
          '如果车尾开始滑动，轻微反打方向并保持油门'
        ]
      }
    case '刹车不稳':
      return {
        title: '刹车不稳调车建议',
        advice: [
          { parameter: '刹车压力', direction: '降低 5-10%', reason: '降低总体制动力防止车轮锁死' },
          { parameter: '刹车平衡', direction: '前移 2-5%', reason: '更多制动力分配到前轮' },
          { parameter: '前弹簧', direction: '调硬 1 格', reason: '减少刹车时的重心前移幅度' }
        ],
        drivingTips: [
          '使用渐进式刹车，先重后轻',
          '刹车点提前 1-2 个车身位',
          '弯前完成大部分减速，弯中释放刹车'
        ]
      }
    case '直道速度慢':
      return {
        title: '直道速度慢调车建议',
        advice: [
          { parameter: '后下压力', direction: '减少 1-2 格', reason: '减少空气阻力提升极速' },
          { parameter: '终传比', direction: '调长 1-2 格', reason: '更长的齿轮比提升极速' },
          { parameter: '车高', direction: '降低 1 格', reason: '降低车身减小迎风面积' }
        ],
        drivingTips: [
          '确保出弯速度足够，直道速度从出弯开始积累',
          '利用尾流（slipstream）超车',
          '高速弯尝试全油通过'
        ]
      }
    case '弯道速度慢':
      return {
        title: '弯道速度慢调车建议',
        advice: [
          { parameter: '前下压力', direction: '增加 1-2 格', reason: '增加弯中前轮抓地力' },
          { parameter: '后下压力', direction: '增加 1 格', reason: '增加弯中后轮稳定性' },
          { parameter: '防倾杆', direction: '前后都调软 1 格', reason: '改善轮胎接地' }
        ],
        drivingTips: [
          '优化走线，使用 Late Apex 给出弯留更多空间',
          '弯中保持稳定油门，不要频繁收给油',
          '提高弯中最低速度，每次提升 2-3 km/h'
        ]
      }
    case '车身不稳定':
      return {
        title: '车身不稳定调车建议',
        advice: [
          { parameter: '悬挂', direction: '整体调硬 1 格', reason: '硬悬挂减少车身晃动' },
          { parameter: '防倾杆', direction: '前后都调硬 1 格', reason: '减少车身侧倾和晃动' },
          { parameter: '减震器回弹', direction: '调硬 1-2 格', reason: '抑制悬挂回弹速度' }
        ],
        drivingTips: [
          '避免突然的方向和油门变化',
          '保持平滑的驾驶风格',
          '入弯时一次打好方向，不要修正'
        ]
      }
    case '轮胎磨损快':
      return {
        title: '轮胎磨损快调车建议',
        advice: [
          { parameter: '胎压', direction: '降低 2-3 PSI', reason: '低胎压减少轮胎过热和磨损' },
          { parameter: '悬挂', direction: '调软 1 格', reason: '软悬挂减少轮胎受到的冲击' },
          { parameter: '差速器', direction: '调松 1 格', reason: '减少弯中轮胎滑移' }
        ],
        drivingTips: [
          '避免过度滑移，滑移 = 轮胎消耗',
          '出弯时温柔给油，减少后轮打滑',
          '走线要干净，避免反复修正'
        ]
      }
    default:
      return {
        title: '通用调车建议',
        advice: [
          { parameter: '悬挂', direction: '保持默认', reason: '没有明显问题时保持默认设定' }
        ],
        drivingTips: [
          '先熟悉赛道走线和刹车点',
          '记录哪个弯角感觉不舒服',
          '逐个弯角优化，不要一次改太多'
        ]
      }
  }
}
