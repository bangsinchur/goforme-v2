import { setAccessToken } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL

export const signUp = async (data: any) => {
  try {
    const res = await fetch(`${API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const payload = await res.json()
    if (!res.ok) {
      throw new Error(payload?.message ?? '회원가입에 실패했습니다.')
    }
    return payload
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw new Error('이미 존재하는 사용자 입니다.')
    }
    throw new Error('회원가입에 실패했습니다.', error.message)
  }
}

export const checkNickName = async (data: { nickName: string }) => {
  try {
    const res = await fetch(`${API}/auth/check/nickName`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const payload = await res.json()
    if (!res.ok) {
      throw new Error(payload?.message ?? '닉네임 중복 체크에 실패했습니다.')
    }
    return payload
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      throw new Error('닉네임이 존재하지 않습니다.')
    }
    throw new Error('닉네임 중복 체크에 실패했습니다.', error.message)
  }
}

export const checkEmail = async (data: { email: string }) => {
  try {
    const res = await fetch(`${API}/auth/check/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const payload = await res.json()
    if (!res.ok) {
      throw new Error(payload?.message ?? '이메일 중복 체크에 실패했습니다.')
    }
    return payload
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      throw new Error('이메일이 존재하지 않습니다.')
    }
    throw new Error('이메일 중복 체크에 실패했습니다.', error.message)
  }
}

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      throw new Error('로그인에 실패했습니다.')
    }
    const result = await res.json()

    setAccessToken(result.accessToken)
    return result
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw new Error('이메일 또는 비밀번호가 등록된 정보와 일치하지 않습니다.')
    }
    throw new Error('로그인중 오류가 발생했습니다.', error.message)
  }
}



export const refreshToken = async () => {
  try {
    const res = await fetch(`${API}/auth/refresh/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    if (!res.ok) {
      throw new Error('토큰 갱신에 실패했습니다.')
    }
    const result = await res.json()
    setAccessToken(result.accessToken)
    return result
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('토큰 갱신에 실패했습니다.')
    }
    throw new Error('토큰 갱신중 오류가 발생했습니다.', error.message)
  }
}
