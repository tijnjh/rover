import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { albums, trendingUp } from 'ionicons/icons'
import { useAuth } from '@/lib/auth-context'

export default function PostsPage() {
  const { subreddits, accessToken } = useAuth()

  const userIsAuthenticated = !!accessToken && subreddits.length > 0

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Subreddits</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <IonList>

          <IonItem routerLink="/posts/popular">
            <IonIcon
              aria-hidden="true"
              icon={trendingUp}
              slot="start"
              className="bg-(--blue) p-1 rounded-full text-white"
            />
            <IonLabel>
              Popular Posts
              <p>Most popular posts across Reddit</p>
            </IonLabel>
          </IonItem>

          <IonItem routerLink="/r/all">
            <IonIcon
              aria-hidden="true"
              icon={albums}
              slot="start"
              className="bg-(--green) p-1 rounded-full text-white"
            />
            <IonLabel>
              All
              <p>Posts across all subreddits</p>
            </IonLabel>
          </IonItem>

          {userIsAuthenticated && subreddits.sort().map((subreddit: string) => (
            <IonItem key={subreddit} routerLink={`/r/${subreddit}`}>
              <IonLabel>
                {subreddit}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
