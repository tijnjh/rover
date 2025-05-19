import FeedView from "@/components/views/FeedView";
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
	useIonToast,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { effetch } from "tsuite";

export default function Search({ subreddit }: { subreddit: string }) {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>r/{subreddit}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen color="light">
				<FeedView
					url={`https://www.reddit.com/r/${subreddit}.json`}
					queryKey={[`subreddit-${subreddit}`]}
				/>
			</IonContent>
		</IonPage>
	);
}
