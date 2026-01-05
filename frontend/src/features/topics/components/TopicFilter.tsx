'use client'

import { TopicTag } from './TopicTag'
import { getAllTopics } from '@/api/topics'

interface TopicFilterProps {
  selectedTopicIds: Array<string>
  onTopicChange: (topicIds: Array<string>) => void
}

export function TopicFilter({
  selectedTopicIds,
  onTopicChange,
}: TopicFilterProps) {
  const topics = getAllTopics()

  const toggleTopic = (topicId: string) => {
    if (selectedTopicIds.includes(topicId)) {
      onTopicChange(selectedTopicIds.filter((id) => id !== topicId))
    } else {
      onTopicChange([...selectedTopicIds, topicId])
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">トピックで絞り込む</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => {
          const isSelected = selectedTopicIds.includes(topic.id)
          return (
            <button
              key={topic.id}
              onClick={() => toggleTopic(topic.id)}
              className="transition-all hover:opacity-80">
              <TopicTag
                topic={topic}
                variant={isSelected ? 'default' : 'outline'}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
