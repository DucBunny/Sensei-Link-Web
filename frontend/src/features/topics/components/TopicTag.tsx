import type { Topic } from '../types/topic'

interface TopicTagProps {
  topic: Topic
  variant?: 'default' | 'outline'
  className?: string
}

export function TopicTag({ topic, variant = 'outline', className }: TopicTagProps) {
  const isSelected = variant === 'default'
  
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
        className || ''
      }`}
      style={
        topic.color
          ? isSelected
            ? {
                backgroundColor: topic.color,
                color: '#ffffff',
                border: `1px solid ${topic.color}`,
              }
            : {
                backgroundColor: 'transparent',
                color: topic.color,
                border: `1px solid ${topic.color}`,
              }
          : undefined
      }
    >
      {topic.nameJa}
    </span>
  )
}

