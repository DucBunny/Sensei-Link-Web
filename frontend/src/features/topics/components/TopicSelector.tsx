'use client'

import { getAllTopics } from '@/api/topics'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TopicSelectorProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export function TopicSelector({ value, onValueChange, placeholder = 'トピックを選択' }: TopicSelectorProps) {
  const topics = getAllTopics()

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {topics.map((topic) => (
          <SelectItem key={topic.id} value={topic.id}>
            {topic.nameJa}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

