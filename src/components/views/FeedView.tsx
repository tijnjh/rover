import LoadingIndicator from "@/components/common/LoadingIndicator.tsx";
import Post from "@/components/thing/Post.tsx";
import * as Reddit from "@/lib/reddit-types.ts";
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
import Comment from "../thing/Comment.tsx";

const POST_LIMIT = 8;

type Entry = Reddit.Link | Reddit.Comment;

export default function FeedView({
  queryKey,
  url,
}: {
  queryKey: string[];
  url: string;
}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [lastEntry, setLastEntry] = useState<Entry>();

  useEffect(() => {
    console.log(lastEntry);
  }, [lastEntry]);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      effetch<Reddit.Result<Entry>>(
        `${url}?limit=${POST_LIMIT}&after=${lastEntry?.kind}_${
          lastEntry?.data?.id ?? "0"
        }`
      ),
    placeholderData: keepPreviousData,
  });

  const [present] = useIonToast();

  useEffect(() => {
    if (data?.data.children) {
      setEntries((prevEntries) => [...prevEntries, ...data.data.children]);

      if (data.data.children.length > 0) {
        setLastEntry(data.data.children[data.data.children.length - 1]);
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

  entries.forEach(console.log);

  return (
    <>
      <IonList style={{ backgroundColor: "transparent" }}>
        {entries.map((thing) => (
          <Entry thing={thing} key={thing.data.id} />
        ))}
      </IonList>

      <IonInfiniteScroll
        onIonInfinite={(event) => {
          refetch()
            .then(() => {
              event.target.complete();
            })
            .catch(() => {
              event.target.complete();
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

function Entry({ entry }: { entry: Entry }) {
  switch (entry?.kind) {
    case "t3":
      return <Post post={thing} />;
    case "t1":
      return <Comment comment={thing} />;
    default:
      <div>item of type {entry.kind} not supported</div>;
  }
}
