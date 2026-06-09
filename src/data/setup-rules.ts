import type { BaseSetup, Modifier, TireModifier, PPBand } from './types'

interface SetupRules {
  baseSetups: Record<string, BaseSetup>
  trackModifiers: Record<string, Modifier>
  tireModifiers: Record<string, TireModifier>
  carModifiers: Record<string, Modifier>
  ppBands: Record<string, PPBand>
}

export const setupRules: SetupRules = {
  baseSetups: {
    gr3: {
      objective: '生成一套稳定、容易复制到 GT7 的 Gr.3 基础竞赛调校，优先可控性、轮胎效率和赛道适配。',
      suspension: {
        rideHeightFront: 65,
        rideHeightRear: 70,
        antiRollFront: 6,
        antiRollRear: 5,
        compressionFront: 30,
        compressionRear: 32,
        reboundFront: 42,
        reboundRear: 44,
        frequencyFront: 3.15,
        frequencyRear: 3.30,
        camberFront: 2.5,
        camberRear: 1.8,
        toeFront: -0.05,
        toeRear: 0.15
      },
      lsd: { initial: 8, accel: 22, brake: 18 },
      aero: { front: 380, rear: 620 },
      power: { ecu: 94, limiter: 100 },
      ballast: { weight: 0, position: 0 },
      transmission: { topSpeed: 300, finalDriveNote: '按赛道直道长度微调，长直道略拉长，技术赛道略缩短。' },
      brakeBias: 0
    },
    china: {
      objective: '生成一套适合高动力中国性能车的基础挑战调校，优先制动稳定、出弯牵引和高速容错。',
      suspension: {
        rideHeightFront: 82,
        rideHeightRear: 88,
        antiRollFront: 5,
        antiRollRear: 4,
        compressionFront: 28,
        compressionRear: 30,
        reboundFront: 38,
        reboundRear: 40,
        frequencyFront: 2.65,
        frequencyRear: 2.80,
        camberFront: 2.0,
        camberRear: 1.5,
        toeFront: -0.03,
        toeRear: 0.18
      },
      lsd: { initial: 10, accel: 18, brake: 22 },
      aero: { front: 260, rear: 420 },
      power: { ecu: 82, limiter: 96 },
      ballast: { weight: 25, position: -10 },
      transmission: { topSpeed: 340, finalDriveNote: '先拉长低速档，减少大扭矩出弯时的轮胎滑移。' },
      brakeBias: -1
    }
  },

  trackModifiers: {
    suzuka: {
      aeroFront: 12, aeroRear: 18, topSpeed: -5, antiRollRear: -1,
      note: '铃鹿需要连续变向和 130R 稳定性，后轴不要调得过硬。'
    },
    nurburgring: {
      rideHeightFront: 8, rideHeightRear: 8, aeroRear: 22,
      compressionFront: -2, compressionRear: -2, topSpeed: 10,
      note: '纽博格林 GP 优先路面容错和高速稳定，悬挂不要过低。'
    },
    spa: {
      aeroFront: 8, aeroRear: 16, topSpeed: 5,
      note: '斯帕需要兼顾 Eau Rouge 稳定和长直道效率。'
    },
    monza: {
      aeroFront: -18, aeroRear: -30, topSpeed: 25, antiRollFront: 1,
      note: '蒙扎长直道优先尾速，可以接受少量低速弯推头。'
    },
    'red-bull-ring': {
      lsdAccel: -2, lsdBrake: 2, brakeBias: 1, topSpeed: 0,
      note: '红牛环重刹和牵引收益高，差速器比极端下压力更重要。'
    },
    barcelona: {
      camberFront: 0.2, aeroFront: 8, aeroRear: 10, antiRollFront: -1,
      note: '加泰罗尼亚会持续消耗前胎，前轴效率和保护都要兼顾。'
    }
  },

  tireModifiers: {
    'racing-hard': { frequency: -0.05, brakeBias: 0, note: 'Racing Hard 适合长距离，调校略保守可减少热衰。' },
    'racing-medium': { frequency: 0, brakeBias: 0, note: 'Racing Medium 是推荐基准胎，平衡单圈和耐久。' },
    'racing-soft': { frequency: 0.08, brakeBias: 1, note: 'Racing Soft 抓地高但磨耗快，避免过度滑移。' },
    intermediate: { frequency: -0.12, aeroFront: 8, aeroRear: 12, brakeBias: -1, note: 'Intermediate 需要更柔和的机械平台和更高稳定余量。' },
    'heavy-wet': { frequency: -0.18, aeroFront: 14, aeroRear: 22, brakeBias: -2, note: 'Heavy Wet 优先排水、稳定和渐进输入。' }
  },

  carModifiers: {
    'porsche-911-rsr-17': { aeroRear: 8, lsdBrake: 2, note: '911 RSR 后轴牵引强，但高速重心转移敏感。' },
    'toyota-gr-supra-racing-concept-18': { lsdAccel: -2, toeRear: 0.03, note: 'Supra 前置后驱出弯要管住扭矩。' },
    'nissan-gtr-nismo-gt3-18': { rideHeightFront: 2, aeroFront: 8, note: 'GT-R 重量感明显，入弯需要更明确的前轴响应。' },
    'mercedes-amg-gt3-20': { brakeBias: 1, lsdBrake: 1, note: 'AMG GT3 适合稳定长距离，制动平台要保持线性。' },
    'ferrari-296-gt3-23': { aeroRear: 10, antiRollRear: -1, note: '296 GT3 中置反应快，避免后轴突然变轻。' },
    'xiaomi-su7-ultra-25': { lsdAccel: -3, ballastWeight: 15, powerEcu: -4, note: 'SU7 Ultra 动力巨大，优先控制出弯扭矩。' },
    'yangwang-u9-24': { rideHeightFront: 4, rideHeightRear: 4, brakeBias: 1, ballastWeight: 20, note: 'U9 重量和动力都高，长距离重视制动温和与轮胎保护。' }
  },

  ppBands: {
    low: { max: 720, ecuDelta: -6, limiterDelta: -4, ballastDelta: 20, label: '低 PP 控制：通过 ECU、动力限制和少量配重压低性能。' },
    mid: { max: 850, ecuDelta: 0, limiterDelta: 0, ballastDelta: 0, label: '中等 PP：保留较自然的动力和底盘平衡。' },
    high: { max: 1200, ecuDelta: 4, limiterDelta: 0, ballastDelta: -10, label: '高 PP：释放动力，风险来自轮胎和制动负荷。' }
  }
}
