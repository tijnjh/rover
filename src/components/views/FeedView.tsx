import LoadingIndicator from "@/components/LoadingIndicator";
import Thing from "@/components/Thing";
import type * as Reddit from "@/lib/reddit-types";
import {
	IonContent,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonList,
	useIonToast,
} from "@ionic/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { effetch } from "tsuite";

const POST_LIMIT = 8;

export default function FeedView({
	queryKey,
	url,
}: {
	queryKey: string[];
	url: string;
}) {
	const [entries, setEntries] = useState<Reddit.Link[]>([]);
	const [lastEntryId, setLastEntryId] = useState<string>();

	const { isPending, error, data, refetch } = useQuery({
		queryKey: queryKey,
		queryFn: () =>
			effetch<Reddit.Thing & { data: { children: Reddit.Link[] } }>(
				`${url}?limit=${POST_LIMIT}&after=t3_${lastEntryId ?? "0"}`,
			),
		placeholderData: keepPreviousData,
	});

	const [present] = useIonToast();

	useEffect(() => {
		if (data?.data.children) {
			setEntries((prevEntries) => [...prevEntries, ...data.data.children]);

			if (data.data.children.length > 0) {
				setLastEntryId(
					data.data.children[data.data.children.length - 1].data.id,
				);
			}
		}
	}, [data]);

	if (error) {
		present({
			message: `Failed to load post: ${error}`,
		});
		return (
			<IonContent>
				<p className="mx-auto w-fit">Error loading posts.</p>
			</IonContent>
		);
	}

	if (isPending && entries.length === 0) {
		return <LoadingIndicator />;
	}

	return (
		<>
			<IonList style={{ backgroundColor: "transparent" }}>
				{entries.map((post) => (
					<Thing.T3 post={post} key={post.data.id} />
				))}
			</IonList>

			<IonInfiniteScroll
				onIonInfinite={(event) => {
					refetch()
						.then(() => {
							// Complete the infinite scroll event after refetch
							event.target.complete();
						})
						.catch(() => {
							event.detail;
							// Handle potential errors during refetch
							event.target.complete(); // Still complete the event to avoid getting stuck
							present({
								message: "Failed to load more posts.",
								duration: 2000,
							});
						});
				}}
			>
				<IonInfiniteScrollContent />
			</IonInfiniteScroll>
		</>
	);
}
