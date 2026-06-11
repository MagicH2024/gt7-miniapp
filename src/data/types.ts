/* ==============================
   车辆相关
   ============================== */

export interface Car {
  id: string
  nameEn: string
  nameZh: string
  brandEn: string
  brandZh: string
  category: string       // Gr.3 / 中国车 / N400 等
  drivetrain: string     // FR / MR / AWD / FF
  tags: string[]
  ppBase: number
}

/* ==============================
   赛道相关
   ============================== */

export interface Track {
  id: string
  slug: string
  nameEn: string
  nameZh: string
  regionEn: string
  regionZh: string
  lengthKm: string
  cornerCount: string
  referenceLap: string
  difficulty: '入门' | '进阶' | '高级'
  tags: string[]
  layouts: string[]
  features: string[]
  practiceFocus: string[]
}

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

/* ==============================
   轮胎相关
   ============================== */

export interface Tire {
  id: string
  name: string
  shortName: string
  color: string
  colorName: string
  surface: 'dry' | 'wet'
  grip: string
  wear: string
  description: string
}

/* ==============================
   天气相关
   ============================== */

export interface WeatherOption {
  id: string
  name: string
  code: string
  description: string
  aeroDelta: number
  brakeBiasDelta: number
  stabilityNote: string
}

export interface WeatherRules {
  options: WeatherOption[]
  tireWarnings: Record<string, Record<string, string>>
}

/* ==============================
   调校规则相关
   ============================== */

export interface SuspensionSetup {
  rideHeightFront: number
  rideHeightRear: number
  antiRollFront: number
  antiRollRear: number
  compressionFront: number
  compressionRear: number
  reboundFront: number
  reboundRear: number
  frequencyFront: number
  frequencyRear: number
  camberFront: number
  camberRear: number
  toeFront: number
  toeRear: number
}

export interface LSDSetup {
  initial: number
  accel: number
  brake: number
}

export interface AeroSetup {
  front: number
  rear: number
}

export interface PowerSetup {
  ecu: number
  limiter: number
}

export interface BallastSetup {
  weight: number
  position: number
}

export interface TransmissionSetup {
  topSpeed: number
  finalDriveNote: string
}

export interface BaseSetup {
  objective: string
  suspension: SuspensionSetup
  lsd: LSDSetup
  aero: AeroSetup
  power: PowerSetup
  ballast: BallastSetup
  transmission: TransmissionSetup
  brakeBias: number
}

export interface Modifier {
  rideHeightFront?: number
  rideHeightRear?: number
  antiRollFront?: number
  antiRollRear?: number
  compressionFront?: number
  compressionRear?: number
  camberFront?: number
  camberRear?: number
  toeFront?: number
  toeRear?: number
  lsdAccel?: number
  lsdBrake?: number
  aeroFront?: number
  aeroRear?: number
  powerEcu?: number
  powerLimiter?: number
  ballastWeight?: number
  ballastPosition?: number
  topSpeed?: number
  brakeBias?: number
  note?: string
}

export interface TireModifier {
  frequency: number
  aeroFront?: number
  aeroRear?: number
  brakeBias: number
  note: string
}

export interface PPBand {
  max: number
  ecuDelta: number
  limiterDelta: number
  ballastDelta: number
  label: string
}

/* ==============================
   调校结果
   ============================== */

export interface SetupSection {
  id: string
  title: string
  rows: { label: string; value: string }[]
}

export interface SetupResult {
  source: string
  basicInfo: {
    car: string
    carSub: string
    track: string
    trackSub: string
    targetPp: string
    weather: string
    tire: string
    tireColor: string
    tireShortName: string
  }
  objective: string
  sections: SetupSection[]
  weatherCorrection: string[]
  explanation: string[]
  risks: string[]
}

/* ==============================
   问题驱动调车（保留）
   ============================== */

export type CarProblem =
  | '转向不足'
  | '转向过度'
  | '刹车不稳'
  | '直道速度慢'
  | '弯道速度慢'
  | '车身不稳定'
  | '轮胎磨损快'

export interface TuningAdvice {
  parameter: string
  direction: string
  reason: string
}

export interface ProblemTuningResult {
  title: string
  advice: TuningAdvice[]
  drivingTips: string[]
}

/* ==============================
   收藏记录
   ============================== */

export interface GarageRecord {
  id: string
  title: string
  subtitle: string
  createdAt: string
  setup: SetupResult
}

/* ==============================
   新手练车
   ============================== */

export interface PracticeLesson {
  id: string
  title: string
  level: '基础' | '进阶' | '高级'
  icon: string
  summary: string
  keyPoints: string[]
  drill: string
  tips: string[]
  recommendedTrack: string   // 推荐练习赛道 id
}

export interface PracticeStep {
  order: number
  title: string
  description: string
  laps: number
}

export interface PracticePlan {
  id: string
  trackId: string
  title: string
  level: '入门' | '进阶'
  description: string
  steps: PracticeStep[]
  targetLapTime: string
}

export interface PracticeRecord {
  id: string
  trackId: string
  trackNameZh: string
  laps: number
  bestLap: string
  notes: string
  createdAt: number
}
