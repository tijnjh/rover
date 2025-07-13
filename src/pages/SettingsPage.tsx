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
          <div className="mx-4">

            <p>
              1. Sign into your reddit account (on desktop) and go here:
              {' '}
              <a href="https://reddit.com/prefs/apps">https://reddit.com/prefs/apps</a>
            </p>

            <p>2. Click the "are you a developer? create an app..." button</p>
            <p>
              3. Fill in the fields
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
            </p>
            <p>4. Click "create app" </p>
            <p>5. After creating the app you'll get a client identifier; It'll be a bunch of random characters.</p>
            <p>6. Enter it here</p>
          </div>

        </IonNote>

      </IonContent>
    </IonPage>
  )
}
