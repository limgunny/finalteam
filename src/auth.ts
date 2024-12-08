import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // 반드시 설정 필요
  pages: {
    signIn: '/login', // 커스텀 로그인 페이지 (선택)
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('Sign-in Callback:', { user, account })
      if (account?.provider === 'google' || account?.provider === 'github') {
        return true // 권한 검사 후 true 반환
      }
      return false // 기본적으로 false 반환
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
})
