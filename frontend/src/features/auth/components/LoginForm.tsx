import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { loginSchema } from '../auth.schema'
import { FormField } from './FormField'
import type { LoginFormData } from '../auth.schema'
import { Button } from '@/components/ui/button'
import { authenticateUser } from '@/api/users'

export const LoginForm = () => {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const user = authenticateUser(value.email, value.password)

      if (!user) {
        toast.error('メールアドレスまたはパスワードが正しくありません。')
        return
      }

      toast.success(`ようこそ、${user.name}先生！`)
      navigate({ to: '/' })
      form.reset()
    },
  })

  return (
    <div className="rounded-3xl border-2 border-gray-900 bg-white px-12 py-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
        <form.Field
          name="email"
          children={(field) => (
            <FormField
              field={field}
              label="メールアドレス"
              className="mb-6 w-120"
            />
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <FormField
              field={field}
              label="パスワード"
              type="password"
              className="w-120"
            />
          )}
        />

        <div className="mb-3 text-center">
          <Button
            type="button"
            variant="link"
            className="text-xs font-semibold text-gray-400 hover:text-gray-600">
            パスワードをお忘れの方
          </Button>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={!canSubmit}
                className="w-1/2 rounded-lg">
                {isSubmitting ? '検証中...' : 'ログイン'}
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  )
}
