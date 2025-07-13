import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import FeedView from '@/components/views/FeedView.tsx'

export default function SubredditPage({ subreddit }: { subreddit: string }) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" />
          </IonButtons>
          <IonTitle>
            r/
            {subreddit}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <FeedView
          path={`/r/${subreddit}.json`}
          queryKey={[`subreddit-${subreddit}`]}
        />
      </IonContent>
    </IonPage>
  )
}
