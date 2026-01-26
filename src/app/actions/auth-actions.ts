'use server'

import { API } from '@/lib/constants'

export const signUpAction = async (data: any) => {
  
  const res = await fetch(`${API}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const message = await res.text().catch(() => '')
    throw new Error(message || '회원가입에 실패했습니다.')
  }
}