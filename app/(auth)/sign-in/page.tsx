'use client'

import AuthForm, { signInSchema } from '@/components/AuthForm'
import { signInWithCredentials } from '@/lib/actions/auth'
import React from 'react'

const SigninPage = () => {
  return (
    <AuthForm type="SIGN_IN" schema={signInSchema} defaultValues={{
      email: '',
      password: ''
    }} 
      onSubmit={signInWithCredentials}
    />
  )
}

export default SigninPage