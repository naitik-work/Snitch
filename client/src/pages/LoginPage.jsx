import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginForm } from '../features/auth/ui/LoginForm'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSuccess = () => {
    const from = location.state?.from?.pathname
    if (from) {
      navigate(from, { replace: true })
    } else {
      navigate('/account', { replace: true })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="bg-surface border border-hairline p-8 sm:p-12 max-w-md mx-auto">
        <LoginForm
          onSuccess={handleSuccess}
          onSwitchToRegister={() => navigate('/auth/register', { state: location.state })}
        />
      </div>
    </div>
  )
}

