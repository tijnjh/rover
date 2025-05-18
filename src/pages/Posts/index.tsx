import {
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";

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
						<IonLabel>Popular posts</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
}
