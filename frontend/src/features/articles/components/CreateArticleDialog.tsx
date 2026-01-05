'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ArticleForm } from './ArticleForm'

interface CreateArticleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateArticleDialog({ open, onOpenChange }: CreateArticleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>新しい記事を作成</DialogTitle>
          <DialogDescription>
            短くて実用的な記事を共有しましょう（1-2分で読める内容）
          </DialogDescription>
        </DialogHeader>
        <ArticleForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

