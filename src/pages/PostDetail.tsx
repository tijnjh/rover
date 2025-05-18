import Thing from "@/components/Thing";
import { useQuery } from "@tanstack/react-query";
import { effetch } from "tsuite";
import type * as Reddit from "@/lib/reddit-types";
import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonList,
	IonPage,
	IonSpinner,
	IonTitle,
	IonToolbar,
	useIonToast,
} from "@ionic/react";

type PostDetailResult = [
	{
		data: {
			children: [Reddit.Link];
		};
	},
];

export default function PostDetail({
	subreddit,
	id,
}: {
	subreddit: string;
	id: string;
}) {
	const [present] = useIonToast();

	const { data, error, isPending } = useQuery({
		queryKey: [`detail-${id}`],
		queryFn: () =>
			effetch<PostDetailResult>(
				`https://www.reddit.com/r/${subreddit}/comments/${id}.json`,
			),
	});

	console.log(data?.[0]);

	if (error) {
		present({
			message: `Failed to load post: ${error}`,
		});
		return;
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/posts" text="Subreddits" />
					</IonButtons>
					<IonTitle>Back</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen color="light">
				{isPending ? (
					<IonSpinner className="mx-auto block mt-10" />
				) : (
					<IonList>
						<Thing.T3 post={data[0].data.children[0]} />
					</IonList>
				)}
			</IonContent>
		</IonPage>
	);
}
