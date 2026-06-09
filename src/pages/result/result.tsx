import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { generateSetup } from '../../data/setup-generator'
import { addToGarage, genId, formatDate } from '../../utils/storage'
import './result.scss'

export default function Result() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  const params = router.params as {
    carId: string
    trackId: string
    targetPp: string
    weatherId: string
    tireId: string
  }

  const setup = generateSetup({
    carId: params.carId,
    trackId: params.trackId,
    targetPp: Number(params.targetPp),
    weatherId: params.weatherId,
    tireId: params.tireId
  })

  const handleSave = () => {
    if (saved) return
    addToGarage({
      id: genId(),
      title: `${setup.basicInfo.car} · ${setup.basicInfo.track}`,
      subtitle: `PP ${setup.basicInfo.targetPp} · ${setup.basicInfo.weather} · ${setup.basicInfo.tireShortName}`,
      createdAt: formatDate(new Date()),
      setup
    })
    setSaved(true)
    Taro.showToast({ title: '已收藏', icon: 'success' })
  }

  const handleCopy = () => {
    const lines: string[] = [
      `【调校参数表】`,
      `车辆: ${setup.basicInfo.car}`,
      `车辆信息: ${setup.basicInfo.carSub}`,
      `赛道: ${setup.basicInfo.track} (${setup.basicInfo.trackSub})`,
      `PP: ${setup.basicInfo.targetPp}`,
      `天气: ${setup.basicInfo.weather}`,
      `轮胎: ${setup.basicInfo.tire} (${setup.basicInfo.tireShortName})`,
      '',
      `目标: ${setup.objective}`,
      ''
    ]
    setup.sections.forEach(s => {
      lines.push(`=== ${s.title} ===`)
      s.rows.forEach(r => lines.push(`${r.label}: ${r.value}`))
      lines.push('')
    })
    lines.push('=== 天气修正 ===')
    setup.weatherCorrection.forEach(l => lines.push(`- ${l}`))
    lines.push('')
    lines.push('=== 调校说明 ===')
    setup.explanation.forEach(l => lines.push(`- ${l}`))

    Taro.setClipboardData({
      data: lines.join('\n'),
      success: () => Taro.showToast({ title: '已复制', icon: 'success' })
    })
  }

  return (
    <View className='result-page'>
      <View className='result-header'>
        <Text className='eyebrow'>SETUP TABLE</Text>
        <Text className='result-title'>完整调校参数表</Text>
      </View>

      <View className='summary-card'>
        <View className='summary-hero'>
          <View>
            <Text className='hero-car'>{setup.basicInfo.car}</Text>
            <Text className='hero-track'>{setup.basicInfo.track}</Text>
          </View>
          <Text className='hero-pp'>PP {setup.basicInfo.targetPp}</Text>
        </View>
        <View className='summary-row'><Text className='row-label'>车辆信息</Text><Text className='row-value'>{setup.basicInfo.carSub}</Text></View>
        <View className='summary-row'><Text className='row-label'>赛道</Text><Text className='row-value'>{setup.basicInfo.trackSub}</Text></View>
        <View className='summary-row'><Text className='row-label'>天气</Text><Text className='row-value'>{setup.basicInfo.weather}</Text></View>
        <View className='summary-row'><Text className='row-label'>轮胎</Text><Text className='row-value'>{setup.basicInfo.tire} · {setup.basicInfo.tireShortName}</Text></View>
      </View>

      <View className='objective-card'>
        <Text className='objective-text'>{setup.objective}</Text>
      </View>

      {setup.sections.map((section, i) => (
        <View key={section.id}>
          <Text className='section-label'>{i + 1}. {section.title}</Text>
          <View className='table-card'>
            {section.rows.map((row, j) => (
              <View key={j} className='table-row'>
                <Text className='row-label'>{row.label}</Text>
                <Text className='row-value'>{row.value}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Text className='section-label'>天气修正</Text>
      <View className='info-card'>
        {setup.weatherCorrection.map((line, i) => (
          <Text key={i} className='info-line'>- {line}</Text>
        ))}
      </View>

      <Text className='section-label'>调校说明</Text>
      <View className='info-card'>
        {setup.explanation.map((line, i) => (
          <Text key={i} className='info-line'>- {line}</Text>
        ))}
      </View>

      <Text className='section-label'>风险提示</Text>
      <View className='info-card'>
        {setup.risks.map((line, i) => (
          <Text key={i} className='info-line'>- {line}</Text>
        ))}
      </View>

      <View className='action-bar'>
        <View className='action-btn copy-btn' onClick={handleCopy}>
          <Text>📋 复制参数</Text>
        </View>
        <View className={`action-btn save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
          <Text>{saved ? '✅ 已收藏' : '⭐ 收藏到车库'}</Text>
        </View>
      </View>
    </View>
  )
}
