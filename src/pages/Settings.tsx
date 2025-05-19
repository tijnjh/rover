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

export default function Settings() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Settings</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen color="light">
				<IonList inset>
					<IonItem href="https://tijn.dev/rover">
						<IonLabel>View on github</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
}
