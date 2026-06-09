import type { CarClass, Drivetrain, Weather, CarProblem, TuningResult } from './types'

/**
 * 调车规则库
 * 基于 GT7 调车逻辑：车辆级别 × 驱动形式 × 天气 × 问题 → 调车建议
 *
 * 调车思路：
 * - 转向不足（推头）→ 前轴抓地力不足 → 增加前轴下压力 / 调软前防倾杆 / 调硬后防倾杆
 * - 转向过度（甩尾）→ 后轴抓地力不足 → 增加后轴下压力 / 调硬前防倾杆 / 调软后防倾杆
 * - 刹车不稳 → 刹车平衡 / 刹车压力 / 悬挂刚度
 * - 直道速度慢 → 降低下压力 / 调整齿轮比 / 降低阻力
 * - 弯道速度慢 → 增加下压力 / 调整悬挂 / 改善抓地力
 * - 车身不稳定 → 悬挂刚度 / 防倾杆 / 减震器
 * - 轮胎磨损快 → 降低胎压 / 调软悬挂 / 减少滑移
 */

interface RuleContext {
  carClass: CarClass
  drivetrain: Drivetrain
  weather: Weather
  problem: CarProblem
}

/** 根据车辆级别给出下压力范围建议 */
function getDownforceNote(carClass: CarClass): string {
  const map: Record<CarClass, string> = {
    'N200': '街车级别，下压力调节范围有限，优先改善机械抓地力',
    'N400': '运动车级别，适度增加下压力可改善弯道表现',
    'N600': '高性能级别，下压力调节效果明显',
    'N800': '超跑级别，下压力是关键调校参数',
    'Gr.4': 'GT4 级别赛车，下压力调校空间大',
    'Gr.3': 'GT3 级别赛车，下压力对圈速影响显著',
    'Gr.2': 'GT2 级别赛车，需要精确的空力平衡',
    'Gr.1': '顶级赛车，空力效率决定一切'
  }
  return map[carClass]
}

/** 雨天通用建议 */
function getRainAdvice(problem: CarProblem): TuningResult {
  const base: TuningResult = {
    title: '雨天调车方案',
    advice: [
      { parameter: '轮胎', direction: '换用雨胎或中间胎', reason: '雨天路面抓地力大幅下降，需要专用轮胎排水' },
      { parameter: '胎压', direction: '降低 2-3 PSI', reason: '低胎压增加接地面积，提升湿地抓地力' },
      { parameter: '下压力', direction: '增加 1-2 格', reason: '雨天需要更多下压力来补偿抓地力损失' },
      { parameter: '刹车平衡', direction: '前移 2-3%', reason: '雨天刹车距离变长，前移平衡减少后轮锁死' }
    ],
    drivingTips: [
      '提前刹车，刹车距离比晴天多 20-30%',
      '避免急打方向，保持柔和的转向输入',
      '出弯时温柔给油，避免后轮打滑',
      '寻找干燥的赛车线（rubbered-in line）',
      '积水区域保持方向稳定，不要突然变向'
    ]
  }

  switch (problem) {
    case '转向不足':
      base.title = '雨天 + 转向不足调车方案'
      base.advice.push(
        { parameter: '前防倾杆', direction: '调软 1-2 格', reason: '软化前轴增加前轮抓地，减少推头' },
        { parameter: '后防倾杆', direction: '调硬 1 格', reason: '适当增加后轴负荷转移，帮助车头入弯' }
      )
      base.drivingTips.push('入弯前充分减速，不要带着刹车进弯心')
      break
    case '转向过度':
      base.title = '雨天 + 转向过度调车方案'
      base.advice.push(
        { parameter: '后防倾杆', direction: '调软 1-2 格', reason: '软化后轴增加后轮抓地，减少甩尾' },
        { parameter: '前防倾杆', direction: '调硬 1 格', reason: '增加前轴刚性，稳定车头' }
      )
      base.drivingTips.push('出弯时渐进给油，避免突然全油导致后轮突破抓地力')
      break
    case '刹车不稳':
      base.title = '雨天 + 刹车不稳调车方案'
      base.advice.push(
        { parameter: '刹车压力', direction: '降低 5-10%', reason: '雨天降低刹车压力防止车轮锁死' },
        { parameter: '刹车平衡', direction: '前移 3-5%', reason: '更多制动力分配到前轮，减少后轮锁死风险' }
      )
      base.drivingTips.push('使用点刹技巧，不要一脚踩死')
      break
    default:
      base.advice.push(
        { parameter: '悬挂', direction: '整体调软 1 格', reason: '软悬挂帮助轮胎更好地贴合不平路面' }
      )
  }
  return base
}

/** 根据问题类型生成主规则 */
function getDryAdvice(ctx: RuleContext): TuningResult {
  const { carClass, drivetrain, problem } = ctx

  switch (problem) {
    case '转向不足':
      return getUndersteerAdvice(carClass, drivetrain)
    case '转向过度':
      return getOversteerAdvice(carClass, drivetrain)
    case '刹车不稳':
      return getBrakingAdvice(carClass)
    case '直道速度慢':
      return getTopSpeedAdvice(carClass)
    case '弯道速度慢':
      return getCornerSpeedAdvice(carClass, drivetrain)
    case '车身不稳定':
      return getStabilityAdvice(carClass, drivetrain)
    case '轮胎磨损快':
      return getTireWearAdvice(carClass, drivetrain)
    default:
      return getDefaultAdvice(carClass)
  }
}

function getUndersteerAdvice(carClass: CarClass, drivetrain: Drivetrain): TuningResult {
  const advice = [
    { parameter: '前下压力', direction: '增加 1-2 格', reason: '增加前轴下压力提升前轮抓地力，减少推头' },
    { parameter: '后下压力', direction: '减少 1 格', reason: '减少后轴下压力平衡前后抓地力差异' },
    { parameter: '前防倾杆', direction: '调软 1-2 格', reason: '软化前轴让前轮更好地贴合地面' },
    { parameter: '后防倾杆', direction: '调硬 1 格', reason: '增加后轴刚性帮助车头转入弯道' },
    { parameter: '前束角', direction: '增加外倾角 0.5-1°', reason: '负外倾角增加弯中前轮接地面积' }
  ]

  const drivingTips = [
    '入弯前充分减速，不要带着重刹车进弯',
    '使用晚 Apex 走线，给车头更多时间转向',
    '出弯时等车头指准方向再给油',
    '避免在弯中突然收油，会加剧推头'
  ]

  if (drivetrain === 'FF') {
    advice.push(
      { parameter: '前差速器', direction: '调松 1-2 格', reason: 'FF 车差速器太紧会加剧弯中推头' },
      { parameter: '加速灵敏度', direction: '降低 1 格', reason: '减少前轮打滑导致的推头' }
    )
    drivingTips.push('FF 车出弯时温柔给油，猛油会推头')
  }

  if (drivetrain === 'AWD') {
    advice.push(
      { parameter: '前后扭矩分配', direction: '前轮减少 5-10%', reason: '减少前轮驱动力负担，改善转向' }
    )
  }

  return {
    title: '转向不足（推头）调车方案',
    advice,
    drivingTips
  }
}

function getOversteerAdvice(carClass: CarClass, drivetrain: Drivetrain): TuningResult {
  const advice = [
    { parameter: '后下压力', direction: '增加 1-2 格', reason: '增加后轴下压力提升后轮稳定性' },
    { parameter: '前下压力', direction: '减少 1 格', reason: '减少前轴下压力平衡前后抓地力' },
    { parameter: '后防倾杆', direction: '调软 1-2 格', reason: '软化后轴让后轮更好地贴合地面' },
    { parameter: '前防倾杆', direction: '调硬 1 格', reason: '增加前轴刚性稳定车头' },
    { parameter: '后束角', direction: '增加外倾角 0.5°', reason: '增加弯中后轮接地面积' }
  ]

  const drivingTips = [
    '出弯时渐进给油，不要突然全油',
    '入弯时保持稳定，不要突然打方向',
    '如果车尾开始滑动，轻微反打方向并保持油门',
    '避免在弯中突然收油，会导致重心前移加剧甩尾'
  ]

  if (drivetrain === 'FR') {
    advice.push(
      { parameter: '后差速器', direction: '调松 1-2 格', reason: 'FR 车后差速器太紧会加剧出弯甩尾' },
      { parameter: '加速灵敏度', direction: '降低 1 格', reason: '减少后轮打滑倾向' }
    )
    drivingTips.push('FR 车出弯时注意油门控制，渐进给油是关键')
  }

  if (drivetrain === 'MR') {
    advice.push(
      { parameter: '后弹簧', direction: '调硬 1 格', reason: 'MR 车重心靠后，需要更多后轴支撑' }
    )
    drivingTips.push('MR 车动态敏感，任何操作都要柔和')
  }

  return {
    title: '转向过度（甩尾）调车方案',
    advice,
    drivingTips
  }
}

function getBrakingAdvice(carClass: CarClass): TuningResult {
  return {
    title: '刹车不稳调车方案',
    advice: [
      { parameter: '刹车压力', direction: '降低 5-10%', reason: '降低总体制动力防止车轮锁死' },
      { parameter: '刹车平衡', direction: '前移 2-5%', reason: '更多制动力分配到前轮，前轮锁死比后轮锁死更容易控制' },
      { parameter: '前弹簧', direction: '调硬 1 格', reason: '减少刹车时的重心前移幅度' },
      { parameter: '减震器压缩', direction: '前轴调硬 1 格', reason: '抑制刹车时车头过度下沉' },
      { parameter: '刹车冷却', direction: '开大进气口', reason: '改善刹车散热，减少热衰减' }
    ],
    drivingTips: [
      '使用渐进式刹车，先重后轻',
      '刹车点提前 1-2 个车身位',
      '弯前完成大部分减速，弯中释放刹车',
      '避免在刹车区打方向，容易锁死',
      '长直道后第一个弯要特别注意刹车温度'
    ]
  }
}

function getTopSpeedAdvice(carClass: CarClass): TuningResult {
  return {
    title: '直道速度慢调车方案',
    advice: [
      { parameter: '后下压力', direction: '减少 1-2 格', reason: '减少空气阻力提升极速' },
      { parameter: '前下压力', direction: '减少 1 格', reason: '降低整体风阻' },
      { parameter: '终传比', direction: '调长 1-2 格', reason: '更长的齿轮比提升极速，但牺牲加速' },
      { parameter: '高速齿轮比', direction: '调长 1 格', reason: '优化高速档位的极速表现' },
      { parameter: '车高', direction: '降低 1 格', reason: '降低车身减小迎风面积' }
    ],
    drivingTips: [
      '确保出弯速度足够，直道速度从出弯开始积累',
      '利用尾流（slipstream）超车',
      '检查弯中是否有不必要的刹车',
      '高速弯尝试全油通过'
    ]
  }
}

function getCornerSpeedAdvice(carClass: CarClass, drivetrain: Drivetrain): TuningResult {
  const advice = [
    { parameter: '前下压力', direction: '增加 1-2 格', reason: '增加弯中前轮抓地力' },
    { parameter: '后下压力', direction: '增加 1 格', reason: '增加弯中后轮稳定性' },
    { parameter: '前弹簧', direction: '调软 1 格', reason: '改善弯中前轮贴地性' },
    { parameter: '后弹簧', direction: '调软 1 格', reason: '改善弯中后轮贴地性' },
    { parameter: '防倾杆', direction: '前后都调软 1 格', reason: '减少车身侧倾，改善轮胎接地' }
  ]

  const drivingTips = [
    '优化走线，使用 Late Apex 给出弯留更多空间',
    '弯中保持稳定油门，不要频繁收给油',
    '提高弯中最低速度，每次提升 2-3 km/h',
    '利用路肩但不要过度，会打乱车身平衡'
  ]

  if (drivetrain === 'AWD') {
    advice.push(
      { parameter: '前后扭矩分配', direction: '根据弯道类型调整', reason: '多弯赛道偏前，高速弯偏后' }
    )
  }

  return {
    title: '弯道速度慢调车方案',
    advice,
    drivingTips
  }
}

function getStabilityAdvice(carClass: CarClass, drivetrain: Drivetrain): TuningResult {
  const advice = [
    { parameter: '悬挂', direction: '整体调硬 1 格', reason: '硬悬挂减少车身晃动' },
    { parameter: '防倾杆', direction: '前后都调硬 1 格', reason: '减少车身侧倾和晃动' },
    { parameter: '减震器回弹', direction: '调硬 1-2 格', reason: '抑制悬挂回弹速度，减少二次晃动' },
    { parameter: '减震器压缩', direction: '调硬 1 格', reason: '减少车身俯仰和侧倾' },
    { parameter: '胎压', direction: '降低 1-2 PSI', reason: '增加轮胎接地面积提升稳定性' }
  ]

  const drivingTips = [
    '避免突然的方向和油门变化',
    '保持平滑的驾驶风格',
    '入弯时一次打好方向，不要修正',
    '出弯时渐进给油，不要突然全油'
  ]

  if (drivetrain === 'MR') {
    advice.push(
      { parameter: '后弹簧', direction: '比前弹簧硬 1 格', reason: 'MR 车需要更多后轴支撑来稳定车尾' }
    )
    drivingTips.push('MR 车特别注意重心转移，任何操作都要柔和')
  }

  return {
    title: '车身不稳定调车方案',
    advice,
    drivingTips
  }
}

function getTireWearAdvice(carClass: CarClass, drivetrain: Drivetrain): TuningResult {
  const advice = [
    { parameter: '胎压', direction: '降低 2-3 PSI', reason: '低胎压减少轮胎过热和磨损' },
    { parameter: '悬挂', direction: '调软 1 格', reason: '软悬挂减少轮胎受到的冲击' },
    { parameter: '外倾角', direction: '减少 0.5-1°', reason: '减少内侧轮胎偏磨' },
    { parameter: '前束角', direction: '调至接近 0', reason: '减少轮胎滚动阻力和磨损' },
    { parameter: '差速器', direction: '调松 1 格', reason: '减少弯中轮胎滑移' }
  ]

  const drivingTips = [
    '避免过度滑移，滑移 = 轮胎消耗',
    '出弯时温柔给油，减少后轮打滑',
    '走线要干净，避免反复修正',
    '长比赛中注意轮胎管理，前半程保守后半程进攻',
    '过弯时保持方向盘角度稳定，不要频繁修正'
  ]

  if (drivetrain === 'FR') {
    advice.push(
      { parameter: '后差速器', direction: '调松 1-2 格', reason: 'FR 车后轮承担驱动力，松差速器减少磨损' }
    )
  }

  return {
    title: '轮胎磨损快调车方案',
    advice,
    drivingTips
  }
}

function getDefaultAdvice(carClass: CarClass): TuningResult {
  return {
    title: '通用调车建议',
    advice: [
      { parameter: '悬挂', direction: '保持默认', reason: '没有明显问题时保持默认设定' },
      { parameter: '胎压', direction: '保持默认', reason: '默认胎压适合大多数情况' }
    ],
    drivingTips: [
      '先熟悉赛道走线和刹车点',
      '记录哪个弯角感觉不舒服',
      '逐个弯角优化，不要一次改太多'
    ]
  }
}

/** 主函数：根据请求生成调车结果 */
export function generateTuningResult(
  carClass: CarClass,
  drivetrain: Drivetrain,
  weather: Weather,
  problem: CarProblem
): TuningResult {
  if (weather === '雨天') {
    return getRainAdvice(problem)
  }
  return getDryAdvice({ carClass, drivetrain, weather, problem })
}

/** 所有可选车辆级别 */
export const carClasses: CarClass[] = ['N200', 'N400', 'N600', 'N800', 'Gr.4', 'Gr.3', 'Gr.2', 'Gr.1']

/** 所有可选驱动形式 */
export const drivetrains: Drivetrain[] = ['FF', 'FR', 'MR', 'AWD']

/** 所有可选天气 */
export const weathers: Weather[] = ['晴天', '雨天']

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
