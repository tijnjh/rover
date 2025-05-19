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
import { cog, search, telescope } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Posts from "./pages/Posts";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./App.css";

import "@ionic/react/css/palettes/dark.system.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import moment from "moment";
import PostDetail from "./pages/PostDetail";
import Popular from "./pages/Posts/Popular";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Subreddit from "./pages/Subreddit";

const queryClient = new QueryClient();

setupIonicReact();

moment.updateLocale("en", {
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

							<Route exact path="/posts" render={() => <Posts />} />

							<Route exact path="/posts/popular" render={() => <Popular />} />

							<Route
								exact
								path="/r/:subreddit/comments/:id"
								render={({ match: { params } }) => <PostDetail {...params} />}
							/>

							<Route
								exact
								path="/r/:subreddit"
								render={({ match: { params } }) => <Subreddit {...params} />}
							/>

							<Route exact path="/search" render={() => <Search />} />

							<Route exact path="/settings" render={() => <Settings />} />
						</IonRouterOutlet>

						<IonTabBar slot="bottom">
							<IonTabButton tab="posts" href="/posts">
								<IonIcon aria-hidden="true" icon={telescope} />
								<IonLabel>Posts</IonLabel>
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
		</QueryClientProvider>
	);
}
