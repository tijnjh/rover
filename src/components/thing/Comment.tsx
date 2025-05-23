import type * as Reddit from "@/lib/reddit-types.ts";
import { IonIcon, IonItem } from "@ionic/react";
import { unescape } from "html-escaper";
import { useState } from "react";
import "./Comment.css";
import Flair from "@/components/common/Flair.tsx";
import { formatNumber } from "@/lib/utils.ts";
import { arrowUp, lockClosed, timeOutline } from "ionicons/icons";
import AnimateHeight from "react-animate-height";
import dayjs from "dayjs";

const allowedImageEmbeds = ["https://i.redd.it/", "https://preview.redd.it/"];

export default function Comment({ comment }: { comment: Reddit.Comment }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!comment.data.body) {
    return;
  }

  const isImageEmbed = allowedImageEmbeds.some((prefix) =>
    comment.data.body.startsWith(prefix)
  );

  return (
    <>
      <IonItem
        button
        detail={false}
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
        className="relative grid grid-cols-1 text-[15px]"
        style={{
          paddingInlineStart: `${comment.data.depth * 0.75}rem`,
          "--padding-start": 0,
          "--padding-end": 0,
          "--inner-padding-start": 0,
          "--inner-padding-end": 0,
        }}
      >
        <div
          className="top-2 absolute rounded-full w-0.5 h-[calc(100%-1rem)]"
          style={{
            backgroundColor: `var(--rainbow-depth-${comment.data.depth})`,
          }}
        />

        <div className="px-4 py-2">
          <div className="flex justify-between items-center w-full overflow-hidden text-(--gray-1) grow">
            <CommentMeta
              author={comment.data.author}
              score={comment.data.score}
              score_hidden={comment.data.score_hidden}
              locked={comment.data.locked}
              author_flair_text={comment.data.author_flair_text}
              created={comment.data.created}
            />
          </div>

          <AnimateHeight height={isCollapsed ? 0 : "auto"}>
            <CommentBody body={comment.data.body} isImageEmbed={isImageEmbed} />
          </AnimateHeight>
        </div>
      </IonItem>
      {comment.data.replies && (
        <AnimateHeight height={isCollapsed ? 0 : "auto"}>
          {comment.data.replies.data.children.map((reply) => (
            <Comment comment={reply} key={reply.data.id} />
          ))}
        </AnimateHeight>
      )}
    </>
  );
}

function CommentMeta({
  author,
  score,
  score_hidden,
  locked,
  author_flair_text,
  created,
}: Pick<
  Reddit.Comment["data"],
  | "author"
  | "score"
  | "score_hidden"
  | "locked"
  | "author_flair_text"
  | "created"
>) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="whitespace-nowrap">{author}</div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <IonIcon icon={arrowUp} size="18" />
          {score_hidden ? "-" : formatNumber(score)}
        </div>
        <div className="flex items-center">
          <IonIcon size="18" aria-hidden="true" icon={timeOutline} />
          {dayjs.unix(created).fromNow()}
        </div>
        {locked && (
          <IonIcon icon={lockClosed} size="18" className="text-(--green)" />
        )}
      </div>
      {author_flair_text && (
        <div className="overflow-hidden shrink grow-0">
          <Flair text={author_flair_text} />
        </div>
      )}
      <div className="flex justify-end items-center self-end grow" />
    </div>
  );
}

function CommentBody({
  body,
  isImageEmbed,
}: {
  body: string;
  isImageEmbed: boolean;
}) {
  return (
    <div>
      {isImageEmbed
        ? <img src={unescape(body)} alt="Comment embed" className="w-36" />
        : (
          unescape(body)
        )}
    </div>
  );
}
