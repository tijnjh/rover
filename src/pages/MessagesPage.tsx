import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

export default function MessagesPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <div className="p-4">
          Messages view is not implemented yet
        </div>
      </IonContent>
    </IonPage>
  )
}
