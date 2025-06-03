import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  cog,
  mail,
  personCircleOutline,
  search,
  telescope,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
import PostsPage from "./pages/posts/PostsPage.tsx";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./App.css";
import "@ionic/react/css/palettes/dark.system.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale.js";
import relativeTime from "dayjs/plugin/relativeTime.js";

import PostDetailPage from "./pages/PostDetailPage.tsx";
import PopularPage from "./pages/posts/PopularPostsPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import SubredditPage from "./pages/SubredditPage.tsx";
import { haptic } from "ios-haptics";

const queryClient = new QueryClient();

setupIonicReact();

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "now",
    ss: "%ss",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/" render={() => <Redirect to="/posts" />} />

              <Route exact path="/posts" render={() => <PostsPage />} />

              <Route
                exact
                path="/posts/popular"
                render={() => <PopularPage />}
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

              <Route exact path="/search" render={() => <SearchPage />} />

              <Route exact path="/settings" render={() => <SettingsPage />} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="posts" href="/posts" onClick={haptic}>
                <IonIcon aria-hidden="true" icon={telescope} />
                <IonLabel>Posts</IonLabel>
              </IonTabButton>

              <IonTabButton>
                <IonIcon aria-hidden="true" icon={mail} onClick={haptic} />
                <IonLabel>Messages</IonLabel>
              </IonTabButton>

              <IonTabButton>
                <IonIcon
                  aria-hidden="true"
                  icon={personCircleOutline}
                  onClick={haptic}
                />
                <IonLabel>Account</IonLabel>
              </IonTabButton>

              <IonTabButton tab="search" href="/search">
                <IonIcon aria-hidden="true" icon={search} onClick={haptic} />
                <IonLabel>Search</IonLabel>
              </IonTabButton>

              <IonTabButton tab="settings" href="/settings">
                <IonIcon aria-hidden="true" icon={cog} onClick={haptic} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
}
