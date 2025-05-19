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
import Comment from "@/components/Comment";

type PostDetailResult = [
	{
		data: {
			children: [Reddit.Link];
		};
	},
	any,
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
						<IonBackButton defaultHref="/posts" text="Back" />
					</IonButtons>
					<IonTitle>
						{data?.[0].data.children[0].data.num_comments} Comments
					</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen color="light">
				{isPending ? (
					<IonSpinner className="mx-auto block mt-10" />
				) : (
					<>
						<IonList className="mb-2">
							<Thing.T3 post={data[0].data.children[0]} />
						</IonList>

						<IonList>
							{data[1]?.data.children.map((comment: Reddit.Comment) => (
								<Comment comment={comment} />
							))}
						</IonList>
					</>
				)}
			</IonContent>
		</IonPage>
	);
}
