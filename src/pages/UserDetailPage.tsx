import FeedView from "@/components/views/FeedView.tsx";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function UserDetailPage({ user }: { user: string }) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" />
          </IonButtons>
          <IonTitle>u/{user}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <FeedView
          url={`https://www.reddit.com/user/${user}.json`}
          queryKey={[`user-${user}`]}
        />
      </IonContent>
    </IonPage>
  );
}
