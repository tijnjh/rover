import type { ReactNode } from 'react'
import { createContext, use, useEffect, useMemo, useState } from 'react'

interface AuthContextType {
  accessToken: string | null
  subreddits: string[]
  isLoading: boolean
  error: string | null
  apiBase: string
  clientId: string
  isLoggedIn: boolean
  setAccessToken: (token: string | null) => void
  setSubreddits: (subreddits: string[]) => void
  setError: (error: string | null) => void
  setIsLoading: (loading: boolean) => void
  setClientId: (clientId: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('reddit_access_token'),
  )
  const [clientId, setClientId] = useState<string>(() =>
    localStorage.getItem('reddit_client_id') || '',
  )
  const [subreddits, setSubreddits] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const apiBase = accessToken ? 'https://oauth.reddit.com' : 'https://www.reddit.com'
  const isLoggedIn = useMemo(() => !!accessToken, [accessToken])

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('reddit_access_token', accessToken)
    }
    else {
      localStorage.removeItem('reddit_access_token')
    }
  }, [accessToken])

  useEffect(() => {
    localStorage.setItem('reddit_client_id', clientId)
  }, [clientId])

  function logout() {
    setAccessToken(null)
    setSubreddits([])
    setError(null)
    localStorage.removeItem('reddit_access_token')
  }

  const contextValue = useMemo(
    () => ({
      accessToken,
      subreddits,
      isLoading,
      error,
      apiBase,
      clientId,
      isLoggedIn,
      setAccessToken,
      setSubreddits,
      setError,
      setIsLoading,
      setClientId,
      logout,
    }),
    [accessToken, subreddits, isLoading, error, apiBase, clientId, isLoggedIn],
  )

  return (
    <AuthContext value={contextValue}>{children}</AuthContext>
  )
}

export function useAuth() {
  const context = use(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
