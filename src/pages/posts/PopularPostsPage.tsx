import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import FeedView from '@/components/views/FeedView.tsx'

export default function PopularPostsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/posts" text="Subreddits" />
          </IonButtons>
          <IonTitle>Popular posts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <FeedView
          url="https://www.reddit.com/hot.json"
          queryKey={['feed-hot']}
        />
      </IonContent>
    </IonPage>
  )
}
