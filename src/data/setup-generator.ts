import type { Car, Track, Tire, WeatherOption, BaseSetup, Modifier, TireModifier, SetupResult, SetupSection } from './types'
import { cars } from './cars'
import { tracks } from './tracks'
import { tires } from './tires'
import { weatherRules } from './weather'
import { setupRules } from './setup-rules'

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function round(value: number, digits: number): number {
  const scale = Math.pow(10, digits)
  return Math.round(value * scale) / scale
}

function findById<T extends { id: string }>(list: T[], id: string): T {
  return list.find((item) => item.id === id) || list[0]
}

function getPpBand(targetPp: number) {
  if (targetPp <= setupRules.ppBands.low.max) return setupRules.ppBands.low
  if (targetPp <= setupRules.ppBands.mid.max) return setupRules.ppBands.mid
  return setupRules.ppBands.high
}

function getBaseSetupKey(car: Car): string {
  return car.category === 'Gr.3' ? 'gr3' : 'china'
}

function applyModifier(setup: BaseSetup, modifier: Modifier | undefined) {
  if (!modifier) return
  setup.suspension.rideHeightFront += modifier.rideHeightFront || 0
  setup.suspension.rideHeightRear += modifier.rideHeightRear || 0
  setup.suspension.antiRollFront += modifier.antiRollFront || 0
  setup.suspension.antiRollRear += modifier.antiRollRear || 0
  setup.suspension.compressionFront += modifier.compressionFront || 0
  setup.suspension.compressionRear += modifier.compressionRear || 0
  setup.suspension.camberFront += modifier.camberFront || 0
  setup.suspension.camberRear += modifier.camberRear || 0
  setup.suspension.toeFront += modifier.toeFront || 0
  setup.suspension.toeRear += modifier.toeRear || 0
  setup.lsd.accel += modifier.lsdAccel || 0
  setup.lsd.brake += modifier.lsdBrake || 0
  setup.aero.front += modifier.aeroFront || 0
  setup.aero.rear += modifier.aeroRear || 0
  setup.power.ecu += modifier.powerEcu || 0
  setup.power.limiter += modifier.powerLimiter || 0
  setup.ballast.weight += modifier.ballastWeight || 0
  setup.ballast.position += modifier.ballastPosition || 0
  setup.transmission.topSpeed += modifier.topSpeed || 0
  setup.brakeBias += modifier.brakeBias || 0
}

function applyTireModifier(setup: BaseSetup, modifier: TireModifier | undefined) {
  if (!modifier) return
  setup.suspension.frequencyFront += modifier.frequency || 0
  setup.suspension.frequencyRear += modifier.frequency || 0
  setup.aero.front += modifier.aeroFront || 0
  setup.aero.rear += modifier.aeroRear || 0
  setup.brakeBias += modifier.brakeBias || 0
}

function applyWeatherModifier(setup: BaseSetup, weather: WeatherOption) {
  setup.aero.front += weather.aeroDelta || 0
  setup.aero.rear += Math.round((weather.aeroDelta || 0) * 1.4)
  setup.brakeBias += weather.brakeBiasDelta || 0
}

function normalizeSetup(setup: BaseSetup) {
  setup.suspension.antiRollFront = clamp(setup.suspension.antiRollFront, 1, 10)
  setup.suspension.antiRollRear = clamp(setup.suspension.antiRollRear, 1, 10)
  setup.suspension.compressionFront = clamp(setup.suspension.compressionFront, 20, 45)
  setup.suspension.compressionRear = clamp(setup.suspension.compressionRear, 20, 45)
  setup.suspension.reboundFront = clamp(setup.suspension.reboundFront, 30, 55)
  setup.suspension.reboundRear = clamp(setup.suspension.reboundRear, 30, 55)
  setup.suspension.frequencyFront = round(clamp(setup.suspension.frequencyFront, 2.1, 3.8), 2)
  setup.suspension.frequencyRear = round(clamp(setup.suspension.frequencyRear, 2.1, 3.9), 2)
  setup.suspension.camberFront = round(clamp(setup.suspension.camberFront, 1.2, 3.2), 1)
  setup.suspension.camberRear = round(clamp(setup.suspension.camberRear, 1.0, 2.6), 1)
  setup.suspension.toeFront = round(clamp(setup.suspension.toeFront, -0.15, 0.05), 2)
  setup.suspension.toeRear = round(clamp(setup.suspension.toeRear, 0.05, 0.30), 2)
  setup.lsd.initial = clamp(setup.lsd.initial, 5, 20)
  setup.lsd.accel = clamp(setup.lsd.accel, 8, 35)
  setup.lsd.brake = clamp(setup.lsd.brake, 8, 35)
  setup.aero.front = clamp(setup.aero.front, 120, 520)
  setup.aero.rear = clamp(setup.aero.rear, 240, 780)
  setup.power.ecu = clamp(setup.power.ecu, 70, 100)
  setup.power.limiter = clamp(setup.power.limiter, 70, 100)
  setup.ballast.weight = clamp(setup.ballast.weight, 0, 200)
  setup.ballast.position = clamp(setup.ballast.position, -50, 50)
  setup.transmission.topSpeed = clamp(setup.transmission.topSpeed, 240, 420)
  setup.brakeBias = clamp(setup.brakeBias, -5, 5)
}

function makeSections(setup: BaseSetup): SetupSection[] {
  return [
    {
      id: 'suspension',
      title: '悬挂设置',
      rows: [
        { label: '车高', value: `前 ${setup.suspension.rideHeightFront} / 后 ${setup.suspension.rideHeightRear}` },
        { label: '防倾杆', value: `前 ${setup.suspension.antiRollFront} / 后 ${setup.suspension.antiRollRear}` },
        { label: '压缩阻尼', value: `前 ${setup.suspension.compressionFront} / 后 ${setup.suspension.compressionRear}` },
        { label: '回弹阻尼', value: `前 ${setup.suspension.reboundFront} / 后 ${setup.suspension.reboundRear}` },
        { label: '自然频率', value: `前 ${setup.suspension.frequencyFront} / 后 ${setup.suspension.frequencyRear}` },
        { label: '外倾角', value: `前 ${setup.suspension.camberFront} / 后 ${setup.suspension.camberRear}` },
        { label: '束角', value: `前 ${setup.suspension.toeFront} / 后 ${setup.suspension.toeRear}` }
      ]
    },
    {
      id: 'lsd',
      title: 'LSD 设置',
      rows: [
        { label: '初始扭矩', value: `${setup.lsd.initial}` },
        { label: '加速灵敏度', value: `${setup.lsd.accel}` },
        { label: '制动灵敏度', value: `${setup.lsd.brake}` }
      ]
    },
    {
      id: 'aero',
      title: '空气动力',
      rows: [
        { label: '前下压力', value: `${setup.aero.front}` },
        { label: '后下压力', value: `${setup.aero.rear}` }
      ]
    },
    {
      id: 'power',
      title: 'ECU / 动力限制',
      rows: [
        { label: 'ECU 输出', value: `${setup.power.ecu}%` },
        { label: '动力限制器', value: `${setup.power.limiter}%` }
      ]
    },
    {
      id: 'ballast',
      title: '配重',
      rows: [
        { label: '配重量', value: `${setup.ballast.weight} kg` },
        { label: '配重位置', value: `${setup.ballast.position}` }
      ]
    },
    {
      id: 'transmission',
      title: '变速箱',
      rows: [
        { label: '最高时速', value: `${setup.transmission.topSpeed} km/h` },
        { label: '终传方向', value: setup.transmission.finalDriveNote }
      ]
    },
    {
      id: 'brake',
      title: '刹车平衡',
      rows: [
        { label: '平衡值', value: `${setup.brakeBias > 0 ? '+' : ''}${setup.brakeBias}` }
      ]
    }
  ]
}

export interface GenerateContext {
  carId: string
  trackId: string
  targetPp: number
  weatherId: string
  tireId: string
}

export function generateSetup(context: GenerateContext): SetupResult {
  const car = findById(cars, context.carId)
  const track = findById(tracks, context.trackId)
  const tire = findById(tires, context.tireId)
  const weather = findById(weatherRules.options, context.weatherId)
  const targetPp = context.targetPp

  const base = clone(setupRules.baseSetups[getBaseSetupKey(car)] || setupRules.baseSetups.gr3)
  const ppBand = getPpBand(targetPp)
  const trackModifier = setupRules.trackModifiers[track.id]
  const carModifier = setupRules.carModifiers[car.id]
  const tireModifier = setupRules.tireModifiers[tire.id]

  base.power.ecu += ppBand.ecuDelta
  base.power.limiter += ppBand.limiterDelta
  base.ballast.weight += ppBand.ballastDelta

  applyModifier(base, trackModifier)
  applyModifier(base, carModifier)
  applyTireModifier(base, tireModifier)
  applyWeatherModifier(base, weather)
  normalizeSetup(base)

  const tireWarningGroup = weatherRules.tireWarnings[weather.id] || {}
  const tireWarning = tireWarningGroup[tire.id]
  const weatherCorrection = [
    weather.stabilityNote,
    tireModifier ? tireModifier.note : '',
    tireWarning || '天气和轮胎组合正常，可以按生成表作为基础设定。'
  ].filter(Boolean)

  return {
    source: 'local-rules',
    basicInfo: {
      car: car.nameEn,
      carSub: `${car.nameZh} · ${car.brandZh} · ${car.category} · ${car.drivetrain}`,
      track: track.nameZh,
      trackSub: `${track.nameEn} · ${track.regionZh}`,
      targetPp: targetPp.toFixed(2),
      weather: weather.name,
      tire: tire.name,
      tireColor: tire.color,
      tireShortName: tire.shortName
    },
    objective: `${base.objective} ${ppBand.label}`,
    sections: makeSections(base),
    weatherCorrection,
    explanation: [
      trackModifier ? trackModifier.note : '',
      carModifier ? carModifier.note : '',
      '这是一套本地规则生成的基础表，目标是先给玩家可抄、可回退、可继续微调的起点。'
    ].filter(Boolean),
    risks: [
      'PP 会随游戏版本、宽体、轮毂、机件和 BoP 条件变化，进游戏后需要按实际 PP 微调 ECU 或配重。',
      '雨地方案不能替代驾驶输入，重刹、路肩和全油出弯仍需要更保守。',
      '这不是实时遥测或 AI 教练，只提供基础模拟调校表。'
    ]
  }
}
