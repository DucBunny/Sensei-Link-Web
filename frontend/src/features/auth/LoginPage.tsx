import { LoginForm } from './components/LoginForm'

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4 dark:bg-gray-900">
      <div>
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">
            先生リンク
          </h1>
          <p className="text-sm text-gray-700 underline underline-offset-3 hover:text-gray-900 dark:text-gray-300">
            先生リンクへようこそ
          </p>
        </div>

        {/* Form Container */}
        <LoginForm />
      </div>
    </div>
  )
}
