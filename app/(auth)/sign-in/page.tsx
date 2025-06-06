'use client'

import AuthForm, { signInSchema } from '@/components/AuthForm'
import React from 'react'

const SigninPage = () => {
  return (
    <AuthForm type="SIGN_IN" schema={signInSchema} defaultValues={{
      email: '',
      password: ''
    }} 
      onSubmit={() => {}}
    />
  )
}

export default SigninPage