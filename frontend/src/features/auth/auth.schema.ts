import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email(
      'メールアドレスは次のようなフォーマットで入力してください  例：name@example.com。',
    ),
  password: z
    .string()
    .min(1, 'パスワードを入力してください')
    .min(6, 'パスワードは6文字以上である必要があります'),
})

export type LoginFormData = z.infer<typeof loginSchema>
