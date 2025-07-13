import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useCallback, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

const CLIENT_ID = 'SiFOHq9Fqi3D03t9rDlX9g'
const REDIRECT_URI = `${window.location.origin}/account`
const SCOPES = ['read', 'mysubreddits']
const STATE = 'random123'

function getAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    state: STATE,
    redirect_uri: REDIRECT_URI,
    duration: 'temporary',
    scope: SCOPES.join(' '),
  })
  return `https://www.reddit.com/api/v1/authorize?${params.toString()}`
}

export default function AccountPage() {
  const { accessToken, setAccessToken, isLoggedIn, subreddits, setSubreddits, clientId, setError, isLoading, setIsLoading, logout } = useAuth()

  const fetchSubreddits = useCallback(async (token: string) => {
    try {
      setIsLoading(true)
      let allSubs: string[] = []
      let after: string | null = null
      do {
        const url = `https://oauth.reddit.com/subreddits/mine/subscriber?limit=100${after ? `&after=${after}` : ''}`
        const response = await fetch(url, {
          headers: { Authorization: `bearer ${token}` },
        })
        const data = await response.json()
        const subs = (data.data?.children || []).map((c: any) => c.data.display_name)
        allSubs = allSubs.concat(subs)
        after = data.data?.after
      } while (after)
      setSubreddits(allSubs)
    }
    catch (err: any) {
      setError(`Failed to fetch subreddits: ${err.message}`)
    }
    finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setSubreddits, setError])

  const exchangeCodeForToken = useCallback(async (code: string) => {
    try {
      setIsLoading(true)

      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      })

      const response = await fetch(
        'https://www.reddit.com/api/v1/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${CLIENT_ID}:`)}`,
          },
          body,
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Token exchange failed: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      if (data.access_token) {
        setAccessToken(data.access_token)
        // Clean URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        )
        return data.access_token
      }
      else {
        throw new Error(`Failed to get access token: ${JSON.stringify(data)}`)
      }
    }
    catch (err: any) {
      setError(err.message)
      return null
    }
    finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setAccessToken, setError])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const state = params.get('state')

    if (code && state === STATE) {
      exchangeCodeForToken(code)
        .then((token) => {
          if (token) {
            fetchSubreddits(token)
          }
        })
    }
    else if (accessToken && subreddits.length === 0 && !isLoading) {
      // Fetch subreddits if we have a token but no subreddits (e.g. after refresh)
      fetchSubreddits(accessToken)
    }
  }, [
    exchangeCodeForToken,
    fetchSubreddits,
    accessToken,
    subreddits.length,
    isLoading,
  ])

  const handleLoginClick = () => {
    window.location.href = getAuthUrl()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <div className="p-4 grid place-items-center h-full">
          <div>
            {isLoading && <div>Loading...</div>}

            {!isLoggedIn
              ? (
                  <>
                    <p className="text-(--ion-color-medium) text-center">
                      Sign in to access your Reddit account, vote on posts, save posts, comment and much more!
                    </p>
                    <IonButton disabled={!!clientId} expand="block" onClick={handleLoginClick}>
                      Sign In with Reddit
                    </IonButton>
                    {!!clientId && (
                      <p className="text-(--ion-color-medium) text-center">
                        Before you can sign in, you need to set a client id in settings.
                      </p>
                    )}
                  </>
                )
              : !isLoading && (
                  <>
                    <h2>Account Status</h2>
                    <p>
                      You are logged in with
                      {' '}
                      {subreddits.length}
                      {' '}
                      subscribed subreddits.
                    </p>
                    <IonButton
                      expand="block"
                      color="danger"
                      onClick={logout}
                    >
                      Logout
                    </IonButton>
                  </>
                )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
