import type * as Reddit from "@/lib/reddit-types.ts";
import { IonIcon, IonItem } from "@ionic/react";
import { unescape as unesc } from "html-escaper";
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
		comment.data.body.startsWith(prefix),
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
					className="absolute top-2 h-[calc(100%-1rem)] w-0.5 rounded-full"
					style={{
						backgroundColor: `var(--rainbow-depth-${comment.data.depth})`,
					}}
				/>

				<div className="px-4 py-2">
					<div className="flex w-full grow items-center justify-between overflow-hidden text-(--gray-1)">
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
					{comment.data.replies.data.children.map((reply: Reddit.Comment) => (
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
		<div className="flex w-full items-center gap-2">
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
				<div className="shrink grow-0 overflow-hidden">
					<Flair text={author_flair_text} />
				</div>
			)}
			<div className="flex grow items-center justify-end self-end" />
		</div>
	);
}

function CommentBody({
	body,
	isImageEmbed,
}: { body: string; isImageEmbed: boolean }) {
	return (
		<div>
			{isImageEmbed ? (
				<img src={unesc(body)} alt="Comment embed" className="w-36" />
			) : (
				unesc(body)
			)}
		</div>
	);
}
