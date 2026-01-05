import type { AnyFieldApi } from '@tanstack/react-form'

export const FieldError = ({ field }: { field: AnyFieldApi }) => {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="mt-1 text-xs text-red-600">
          {field.state.meta.errors[0]?.message}
        </p>
      ) : null}
      {field.state.meta.isValidating ? '検証中...' : null}
    </>
  )
}
