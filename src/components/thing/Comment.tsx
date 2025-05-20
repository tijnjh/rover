import type * as Reddit from "@/lib/reddit-types";
import { IonIcon, IonItem } from "@ionic/react";
import { unescape as unesc } from "html-escaper";
import { useState } from "react";
import "./Comment.css";
import Flair from "@/components/common/Flair";
import { formatNumber } from "@/lib/utils";
import { arrowUp, lockClosed } from "ionicons/icons";
import AnimateHeight from "react-animate-height";

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
						<div className="flex w-full items-center gap-2">
							<div className="whitespace-nowrap">{comment.data.author}</div>
							<div className="flex items-center gap-2">
								<div className="flex items-center">
									<IonIcon icon={arrowUp} size="18" />
									{!comment.data.score_hidden
										? formatNumber(comment.data.score)
										: "-"}
								</div>
								{comment.data.locked && (
									<IonIcon
										icon={lockClosed}
										size="18"
										className="text-(--green)"
									/>
								)}
							</div>
							{comment.data.author_flair_text && (
								<div className="shrink grow-0 overflow-hidden">
									<Flair text={comment.data.author_flair_text} />
								</div>
							)}
							<div className="flex grow items-center justify-end self-end" />
						</div>
					</div>

					<AnimateHeight height={isCollapsed ? 0 : "auto"}>
						<div>
							{isImageEmbed ? (
								<img
									src={unesc(comment.data.body)}
									alt="Comment embed"
									className="w-36"
								/>
							) : (
								unesc(comment.data.body)
							)}
						</div>
					</AnimateHeight>
				</div>
			</IonItem>
			<AnimateHeight height={isCollapsed ? 0 : "auto"}>
				{!!comment.data.replies &&
					comment.data.replies.data.children.map((reply: Reddit.Comment) => (
						<Comment comment={reply} key={reply.data.id} />
					))}
			</AnimateHeight>
		</>
	);
}
