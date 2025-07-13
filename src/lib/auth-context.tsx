import type { ReactNode } from 'react'
import { createContext, use, useEffect, useState } from 'react'

interface AuthContextType {
  accessToken: string | null
  subreddits: string[]
  isLoading: boolean
  error: string | null
  apiBase: string
  setAccessToken: (token: string | null) => void
  setSubreddits: (subreddits: string[]) => void
  setError: (error: string | null) => void
  setIsLoading: (loading: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('reddit_access_token'))
  const [subreddits, setSubreddits] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const apiBase = accessToken ? 'https://oauth.reddit.com' : 'https://www.reddit.com'

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('reddit_access_token', accessToken)
    }
    else {
      localStorage.removeItem('reddit_access_token')
    }
  }, [accessToken])

  function logout() {
    setAccessToken(null)
    setSubreddits([])
    setError(null)
    localStorage.removeItem('reddit_access_token')
  }

  return (
    <AuthContext
      value={{
        accessToken,
        subreddits,
        isLoading,
        error,
        apiBase,
        setAccessToken,
        setSubreddits,
        setError,
        setIsLoading,
        logout,
      }}
    >
      {children}
    </AuthContext>
  )
}

export function useAuth() {
  const context = use(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
