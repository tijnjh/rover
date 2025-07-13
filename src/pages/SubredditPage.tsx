import type { SortOptions } from '@/components/views/FeedView.tsx'
import { IonActionSheet, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { barChartOutline, flame, flameOutline, home, timeOutline, trendingUpOutline, trophy, trophyOutline } from 'ionicons/icons'
import { useQueryState } from 'nuqs'
import FeedView from '@/components/views/FeedView.tsx'
import { haptic } from 'ios-haptics'

export default function SubredditPage({ subreddit }: { subreddit: string }) {
  const [sortOption, setSortOption] = useQueryState('sort')

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton id="open-action-sheet" onClick={haptic}>{sortOption}</IonButton>
            <IonActionSheet
              trigger="open-action-sheet"
              header="Sort by..."
              buttons={[
                {
                  text: 'Best',
                  icon: trophyOutline,
                  data: 'best',
                },
                {
                  text: 'Hot',
                  icon: flameOutline,
                  data: 'hot',
                },
                {
                  text: 'Top',
                  icon: barChartOutline,
                  data: 'top',
                },
                {
                  text: 'New',
                  icon: timeOutline,
                  data: 'new',
                },
                {
                  text: 'Rising',
                  icon: trendingUpOutline,
                  data: 'rising',
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                  data: 'cancel',
                },
              ]}
              onDidDismiss={({ detail }) => setSortOption((prev) => detail.data ?? prev as SortOptions)}
            />
          </IonButtons>
          <IonTitle>
            {`r/${subreddit}`}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <FeedView
          path={`/r/${subreddit}/top.json?t=week`}
          queryKey={[`subreddit-${subreddit}`]}
          sort={sortOption as SortOptions}
        />
      </IonContent>
    </IonPage>
  )
}
