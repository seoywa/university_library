'use client'

import AuthForm, { signUpSchema } from '@/components/AuthForm'
import React from 'react'

const SigninPage = () => {
  return (
    <AuthForm type="SIGN_UP" schema={signUpSchema} defaultValues={{
      email: '',
      password: '',
      fullName: '',
      universityId: 0,
      universityCard: ''
    }} 
      onSubmit={() => {}}
    />
  )
}

export default SigninPage