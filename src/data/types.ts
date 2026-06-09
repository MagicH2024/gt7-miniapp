/** 赛道基本信息 */
export interface Track {
  slug: string
  trackName: string
  trackNameZh: string
  location: string
  lengthKm: string
  cornerCount: string
  referenceLap: string
  difficulty: '入门' | '进阶' | '高级'
  features: string[]        // 赛道特点，如「高速弯多」「刹车区重」
  practiceFocus: string[]   // 练习重点
}

/** 弯角数据 */
export interface Corner {
  id: string
  name: string
  sector: string
  brake: string
  minSpeed: string
  exitSpeed: string
  gear: string
  line: string
  entryZh: string
  apexZh: string
  exitZh: string
  tipZh: string
  mistakeZh: string
}

/** 车辆级别 */
export type CarClass = 'N200' | 'N400' | 'N600' | 'N800' | 'Gr.4' | 'Gr.3' | 'Gr.2' | 'Gr.1'

/** 驱动形式 */
export type Drivetrain = 'FF' | 'FR' | 'MR' | 'AWD'

/** 天气 */
export type Weather = '晴天' | '雨天'

/** 车辆问题 */
export type CarProblem =
  | '转向不足'
  | '转向过度'
  | '刹车不稳'
  | '直道速度慢'
  | '弯道速度慢'
  | '车身不稳定'
  | '轮胎磨损快'

/** 调车请求 */
export interface TuningRequest {
  carClass: CarClass
  drivetrain: Drivetrain
  trackSlug: string
  weather: Weather
  problem: CarProblem
}

/** 单条调车建议 */
export interface TuningAdvice {
  parameter: string      // 调整参数名，如「前防倾杆」
  direction: string      // 调整方向，如「调硬 2 格」
  reason: string         // 为什么这样调
}

/** 调车结果 */
export interface TuningResult {
  title: string           // 方案标题
  advice: TuningAdvice[]  // 调车建议列表
  drivingTips: string[]   // 驾驶建议
}

/** 收藏记录 */
export interface FavoriteRecord {
  id: string
  createdAt: number       // 时间戳
  request: TuningRequest
  result: TuningResult
  trackNameZh: string
}
