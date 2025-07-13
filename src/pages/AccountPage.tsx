import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useCallback, useEffect, useState } from 'react'

const CLIENT_ID = 'SiFOHq9Fqi3D03t9rDlX9g'
const REDIRECT_URI = `${window.location.origin}/account`
const SCOPES = ['read', 'mysubreddits']
const STATE = 'random123' // In production, generate a random state and verify it

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
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [subreddits, setSubreddits] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchSubreddits = useCallback(async (token: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('https://oauth.reddit.com/subreddits/mine/subscriber?limit=100', {
        headers: { Authorization: `bearer ${token}`,
        },
      })
      const data = await response.json()
      setSubreddits((data.data?.children || []).map((c: any) => c.data.display_name))
    }
    catch (err: any) {
      setError(`Failed to fetch subreddits: ${err.message}`)
    }
    finally {
      setIsLoading(false)
    }
  }, [])

  const exchangeCodeForToken = useCallback(async (code: string) => {
    try {
      setIsLoading(true)

      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      })

      const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${CLIENT_ID}:`)}`,
        },
        body,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Token exchange failed: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      if (data.access_token) {
        setAccessToken(data.access_token)
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname)
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
  }, [])

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
  }, [exchangeCodeForToken, fetchSubreddits])

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
        <div className="p-4">
          {isLoading && <div>Loading...</div>}

          {!isLoading && !accessToken
            ? (
                <IonButton expand="block" onClick={handleLoginClick}>
                  Login with Reddit
                </IonButton>
              )
            : !isLoading && (
                <>
                  <h2>Subscribed subreddits:</h2>
                  {subreddits.length > 0
                    ? (
                        <ul>
                          {subreddits.map(s => <li key={s}>{s}</li>)}
                        </ul>
                      )
                    : (
                        <p>No subreddits found.</p>
                      )}
                </>
              )}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </IonContent>
    </IonPage>
  )
}
