import type { PracticePlan } from './types'

export const practicePlans: PracticePlan[] = [
  {
    id: 'plan-red-bull-ring',
    trackId: 'red-bull-ring',
    title: '红牛环入门计划',
    level: '入门',
    description: '红牛环是最短的赛道之一，弯角少且明确，非常适合新手第一次完整练习。',
    targetLapTime: '1:32.000',
    steps: [
      { order: 1, title: '熟悉赛道', description: '慢慢跑 2 圈，不追求速度，记住每个弯的位置和刹车点。', laps: 2 },
      { order: 2, title: '练习 T1 重刹', description: 'T1 是全场最重的刹车区，练习在 100m 牌开始刹车，目标是不锁死、不冲出。', laps: 3 },
      { order: 3, title: '练习 T3 发卡弯', description: 'T3 是低速发卡弯，练习晚 Apex 走线：入弯走外侧 → 弯的 2/3 处切内 → 出弯用尽赛道。', laps: 3 },
      { order: 4, title: '完整圈速', description: '把 T1 和 T3 的练习结合起来，跑完整圈。目标：每圈圈速波动在 1 秒以内。', laps: 5 },
      { order: 5, title: '冲刺测试', description: '全力跑 3 圈，取最快圈速。目标：1:32.000 以内。', laps: 3 }
    ]
  },
  {
    id: 'plan-monza',
    trackId: 'monza',
    title: '蒙扎重刹练习计划',
    level: '入门',
    description: '蒙扎以高速直道和重刹区闻名，是练习刹车技术的最佳赛道。',
    targetLapTime: '1:50.000',
    steps: [
      { order: 1, title: '熟悉赛道', description: '慢慢跑 2 圈，重点感受 Variante Chicane 的刹车距离。', laps: 2 },
      { order: 2, title: '练习 Variante 重刹', description: '从 300km/h+ 减速到 80km/h，练习渐进刹车：先重后轻。', laps: 3 },
      { order: 3, title: '练习 Lesmo 弯', description: 'Lesmo 是中速弯，练习走线：入弯外侧 → 晚 Apex → 出弯外侧。', laps: 3 },
      { order: 4, title: '练习 Parabolica', description: '最后一个弯，高速入弯渐进减速，出弯决定直道速度。', laps: 3 },
      { order: 5, title: '完整冲刺', description: '全力跑 5 圈，目标圈速 1:50.000 以内。', laps: 5 }
    ]
  },
  {
    id: 'plan-brands-hatch',
    trackId: 'brands_hatch',
    title: '布兰兹哈奇节奏练习',
    level: '入门',
    description: '布兰兹哈奇有明显的高低差，是练习节奏感和车身控制的好地方。',
    targetLapTime: '1:27.000',
    steps: [
      { order: 1, title: '熟悉赛道', description: '慢慢跑 2 圈，感受 Paddock Hill Bend 下坡入弯的车身重心转移。', laps: 2 },
      { order: 2, title: '练习 Paddock Hill Bend', description: '下坡入弯，刹车要比平地更早。练习在下坡时保持车身稳定。', laps: 3 },
      { order: 3, title: '练习 Druids 发卡弯', description: '全场最慢的弯，练习晚 Apex 和出弯牵引力。', laps: 3 },
      { order: 4, title: '练习 Clark Curve', description: '最后一个弯，出弯速度决定直道速度。练习渐进出油。', laps: 3 },
      { order: 5, title: '完整冲刺', description: '全力跑 5 圈，目标圈速 1:27.000 以内。', laps: 5 }
    ]
  },
  {
    id: 'plan-donington',
    trackId: 'donington',
    title: '多宁顿高速弯练习',
    level: '进阶',
    description: '多宁顿的 Craner Curves 是经典的高速下坡弯，练习高速弯信心。',
    targetLapTime: '1:30.000',
    steps: [
      { order: 1, title: '熟悉赛道', description: '慢慢跑 2 场，重点感受 Craner Curves 的高速下坡。', laps: 2 },
      { order: 2, title: '练习 Craner Curves', description: '高速下坡连续弯，不需要刹车或轻刹。练习保持油门和方向稳定。', laps: 3 },
      { order: 3, title: '练习 Redgate 第一弯', description: '全场最重的刹车区，从高速减到低速。练习精确刹车。', laps: 3 },
      { order: 4, title: '练习 McLeans 和 Coppice', description: '中高速弯组合，练习连贯的走线和节奏。', laps: 3 },
      { order: 5, title: '完整冲刺', description: '全力跑 5 圈，目标圈速 1:30.000 以内。', laps: 5 }
    ]
  },
  {
    id: 'plan-misano',
    trackId: 'misano',
    title: '米萨诺综合练习',
    level: '入门',
    description: '米萨诺弯角多样且平坦，适合综合练习各类弯角技术。',
    targetLapTime: '1:37.000',
    steps: [
      { order: 1, title: '熟悉赛道', description: '慢慢跑 2 圈，记住每个弯的类型（发卡弯/高速弯/S弯）。', laps: 2 },
      { order: 2, title: '分类练习', description: '分别练习：T1 发卡弯（重刹+晚 Apex）→ T5 高速弯（全油）→ T9 S 弯（节奏）。', laps: 4 },
      { order: 3, title: '连贯性练习', description: '不追求单个弯的极限，追求整圈的流畅。目标：每圈误差 < 0.5 秒。', laps: 5 },
      { order: 4, title: '冲刺测试', description: '全力跑 5 圈，目标圈速 1:37.000 以内。', laps: 5 }
    ]
  }
]
