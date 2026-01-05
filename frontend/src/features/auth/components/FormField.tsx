import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { FieldError } from '@/components/FieldError'

interface FormInputProps {
  field: AnyFieldApi
  label: string
  type?: React.HTMLInputTypeAttribute
  className?: string
  placeholder?: string
}

export const FormField = ({
  field,
  label,
  type = 'text',
  className = '',
  placeholder,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordField = type === 'password'
  const inputType = isPasswordField
    ? showPassword
      ? 'text'
      : 'password'
    : type

  return (
    <div className={cn('grid grid-cols-3 gap-4', className)}>
      <label
        htmlFor={field.name}
        className="col-span-1 flex h-9 items-center text-sm text-gray-800 dark:text-gray-200">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <div className="relative col-span-2">
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          type={inputType}
          placeholder={placeholder}
          className="rounded-full border-gray-400 dark:bg-gray-700 dark:text-gray-200"
        />

        {isPasswordField && (
          <Button
            type="button"
            variant="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-0 right-0"
            tabIndex={-1}>
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        )}

        <FieldError field={field} />
      </div>
    </div>
  )
}
