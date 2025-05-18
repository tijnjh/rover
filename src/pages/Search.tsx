import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState<string | null>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            showCancelButton="focus"
            onIonInput={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen color="light">
        <IonList inset>
          {!query?.includes(" ") && query && (
            <IonItem routerLink={`/r/${query}`}>
              <IonLabel>Go to r/{query}</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
