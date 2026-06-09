import { View, Text } from '@tarojs/components'
import './glossary.scss'

const groups = [
  {
    title: '轮胎',
    items: [
      { name: 'Racing Hard', shortName: 'RH', color: '#f8fafc', detail: '耐久优先，适合长距离、磨耗高或需要稳定节奏的比赛。' },
      { name: 'Racing Medium', shortName: 'RM', color: '#facc15', detail: '抓地和耐久平衡，适合作为默认基准胎。' },
      { name: 'Racing Soft', shortName: 'RS', color: '#ef4444', detail: '单圈抓地最强，但磨耗快，适合排位或短距离冲刺。' },
      { name: 'Intermediate', shortName: 'IM', color: '#22c55e', detail: '适合小雨、半湿路面或天气变化窗口，干地会磨得很快。' },
      { name: 'Heavy Wet', shortName: 'W', color: '#3b82f6', detail: '适合大雨和积水路面，干地速度和耐久都会明显变差。' }
    ]
  },
  {
    title: '调校核心',
    items: [
      { name: 'PP', shortName: '', color: '', detail: 'Performance Points，GT7 对车辆综合性能的评分。不同零件、轮胎和调校都会影响 PP。' },
      { name: 'LSD', shortName: '', color: '', detail: '限滑差速器。加速侧影响出弯牵引，制动侧影响重刹入弯稳定。' },
      { name: '下压力', shortName: '', color: '', detail: '数值越高，高速弯稳定性越强，但直线尾速通常会下降。' },
      { name: '刹车平衡', shortName: '', color: '', detail: '正值偏前、负值偏后。前后移动会改变重刹稳定性和入弯旋转。' },
      { name: '自然频率', shortName: '', color: '', detail: '弹簧硬度的量化指标。数值越高悬挂越硬，响应越快但舒适性下降。' },
      { name: '外倾角', shortName: '', color: '', detail: '车轮倾斜角度。负外倾角增加弯中接地面积，但直线制动略减。' }
    ]
  },
  {
    title: '使用建议',
    items: [
      { name: '先抄表，再微调', shortName: '', color: '', detail: '生成结果是基础起点。进游戏后先跑 3 圈，再根据 PP、轮胎温度和车感微调。' },
      { name: '每次只改一项', shortName: '', color: '', detail: '不要同时改悬挂、LSD 和下压力，否则很难判断是哪一项产生了效果。' },
      { name: '记录你的改动', shortName: '', color: '', detail: '用收藏功能保存不同版本的调校，方便对比和回退。' }
    ]
  }
]

export default function Glossary() {
  return (
    <View className='glossary-page'>
      <View className='page-header'>
        <Text className='eyebrow'>TUNE GLOSSARY</Text>
        <Text className='page-title'>调校词典</Text>
        <Text className='page-desc'>生成时尽量少解释，想了解名词和轮胎适用场景时来这里看。</Text>
      </View>

      {groups.map(group => (
        <View key={group.title}>
          <Text className='section-label'>{group.title}</Text>
          {group.items.map(term => (
            <View key={term.name} className='term-card'>
              <View className='term-head'>
                {term.color && <View className='term-color' style={{ background: term.color }} />}
                <Text className='term-name'>{term.name}</Text>
                {term.shortName && <Text className='term-code'>{term.shortName}</Text>}
              </View>
              <Text className='term-detail'>{term.detail}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
