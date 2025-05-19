import {
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { trendingUp } from "ionicons/icons";

export default function Posts() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Subreddits</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen color="light">
				<IonList>
					<IonItem routerLink="/posts/popular">
						<IonIcon
							aria-hidden="true"
							icon={trendingUp}
							slot="start"
							className="rounded-full bg-(--blue) p-1"
						/>
						<IonLabel>
							Popular Posts
							<p>Most popular posts across Reddit</p>
						</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
}
