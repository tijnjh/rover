import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import updateLocale from 'dayjs/plugin/updateLocale.js'
import { cog, mail, personCircleOutline, search, telescope } from 'ionicons/icons'
import { Redirect, Route } from 'react-router'
import { AuthProvider } from './lib/auth-context'
import AccountPage from './pages/AccountPage.tsx'
import MessagesPage from './pages/MessagesPage.tsx'
import PostDetailPage from './pages/PostDetailPage.tsx'
import PopularPage from './pages/posts/PopularPostsPage.tsx'
import PostsPage from './pages/posts/PostsPage.tsx'
import SearchPage from './pages/SearchPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import SubredditPage from './pages/SubredditPage.tsx'
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import './App.css'
import '@ionic/react/css/palettes/dark.system.css'

const queryClient = new QueryClient()

setupIonicReact()

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'now',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/" render={() => <Redirect to="/posts" />} />

                <Route exact path="/posts" component={PostsPage} />

                <Route exact path="/messages" component={MessagesPage} />

                <Route
                  exact
                  path="/account"
                  component={AccountPage}
                />

                <Route
                  exact
                  path="/posts/popular"
                  component={PopularPage}
                />

                <Route
                  exact
                  path="/r/:subreddit/comments/:id"
                  render={({ match: { params } }) => (
                    <PostDetailPage {...params} />
                  )}
                />

                <Route
                  exact
                  path="/r/:subreddit"
                  render={({ match: { params } }) => (
                    <SubredditPage
                      {...params}
                    />
                  )}
                />

                <Route exact path="/search" component={SearchPage} />

                <Route exact path="/settings" component={SettingsPage} />
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="posts" href="/posts">
                  <IonIcon aria-hidden="true" icon={telescope} />
                  <IonLabel>Posts</IonLabel>
                </IonTabButton>

                <IonTabButton tab="messages" href="/messages">
                  <IonIcon aria-hidden="true" icon={mail} />
                  <IonLabel>Messages</IonLabel>
                </IonTabButton>

                <IonTabButton tab="account" href="/account">
                  <IonIcon
                    aria-hidden="true"
                    icon={personCircleOutline}
                  />
                  <IonLabel>Account</IonLabel>
                </IonTabButton>

                <IonTabButton tab="search" href="/search">
                  <IonIcon aria-hidden="true" icon={search} />
                  <IonLabel>Search</IonLabel>
                </IonTabButton>

                <IonTabButton tab="settings" href="/settings">
                  <IonIcon aria-hidden="true" icon={cog} />
                  <IonLabel>Settings</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      </AuthProvider>
    </QueryClientProvider>
  )
}
