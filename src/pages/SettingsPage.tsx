import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useAuth } from '@/lib/auth-context'

export default function SettingsPage() {
  const { clientId, setClientId } = useAuth()

  const url = URL.parse(location.href)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <IonList inset>
          <IonItem href="https://tijn.dev/rover">
            <IonLabel>View on github</IonLabel>
          </IonItem>
        </IonList>

        <IonList inset>
          <IonItem>
            <IonInput
              type="text"
              label="Client ID"
              placeholder="aBcDeFgHiJkLmN1oPqRsT2u"
              value={clientId}
              onChange={e => setClientId(e.currentTarget.value as string)}
            />
          </IonItem>

        </IonList>

        <IonNote>
          <ol className="pr-4 pl-10 space-y-4">
            <li>
              Sign into your reddit account (on desktop) and go here:
              {' '}
              <a href="https://reddit.com/prefs/apps">https://reddit.com/prefs/apps</a>
            </li>

            <li>Click the "are you a developer? create an app..." button</li>
            <li>
              Fill in the fields
              <ul>
                <li>name: Use whatever</li>
                <li>Choose Installed App</li>
                <li>description: blank space</li>
                <li>about url: blank space</li>
                <li>
                  redirect uri:
                  {' '}
                  <strong>
                    {`${url?.protocol}//${url?.host}/account`}
                  </strong>
                </li>
              </ul>
            </li>
            <li>Click "create app" </li>
            <li>After creating the app you'll get a client identifier; It'll be a bunch of random characters.</li>
            <li>Enter it here</li>
          </ol>
        </IonNote>

      </IonContent>
    </IonPage>
  )
}
