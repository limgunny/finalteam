'use client'

import { signIn, getCsrfToken } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function SignInButton() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  // CSRF 토큰을 가져오는 함수
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken()
      setCsrfToken(token)
    }

    fetchCsrfToken()
  }, [])

  // 로그인 처리 함수
  const handleSignIn = (provider: string) => {
    if (csrfToken) {
      signIn(provider, {
        callbackUrl: '/',
        csrfToken, // CSRF 토큰을 명시적으로 전달
      })
    }
  }

  return (
    <div className="container">
      <h1 className="text-center text-4xl text-pink-500 mb-10">SIGN IN</h1>

      <div className="separator mb-8"></div>

      {/* Google Sign-In Button */}
      <button
        className="google__btn flex items-center justify-center gap-4 w-full max-w-[680px] mx-auto mb-4 rounded-lg p-3"
        onClick={() => handleSignIn('google')}
        disabled={!csrfToken} // CSRF 토큰이 없으면 비활성화
      >
        <Image src="/google-logo.png" height={30} width={30} alt="Google" />
        <span className="flex items-center justify-center relative -top-[38px]">
          Sign in with Google
        </span>
      </button>

      {/* GitHub Sign-In Button */}
      <button
        className="github__btn flex items-center justify-center gap-4 w-full max-w-[680px] mx-auto mb-4 rounded-lg p-3"
        onClick={() => handleSignIn('github')}
        disabled={!csrfToken} // CSRF 토큰이 없으면 비활성화
      >
        <Image src="/github-logo.png" height={30} width={30} alt="GitHub" />
        <span className="flex items-center justify-center relative -top-[38px]">
          Sign in with GitHub
        </span>
      </button>
    </div>
  )
}
