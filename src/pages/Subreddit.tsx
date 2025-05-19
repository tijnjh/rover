import FeedView from "@/components/views/FeedView";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";

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
