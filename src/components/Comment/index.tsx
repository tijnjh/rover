import { IonIcon, IonItem } from "@ionic/react";
import type * as Reddit from "@/lib/reddit-types";
import { useState } from "react";
import { unescape as unesc } from "html-escaper";
import "./theme.css";
import AnimateHeight from "react-animate-height";
import { arrowUp, lockClosed } from "ionicons/icons";
import { formatNumber } from "@/lib/utils";
import Flair from "../Flair";

export default function Comment({ comment }: { comment: Reddit.Comment }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	if (!comment.data.body) {
		return;
	}

	return (
		<>
			<IonItem
				onClick={() => {
					setIsCollapsed(!isCollapsed);
				}}
				className="relative grid grid-cols-1 text-[15px]"
				style={{
					paddingInlineStart: `${comment.data.depth * 0.75}rem`,
					"--padding-start": "0",
					"--padding-end": "0",
				}}
			>
				<div
					className="absolute top-2 h-[calc(100%-1rem)] w-0.5 rounded-full"
					style={{
						backgroundColor: `var(--rainbow-depth-${comment.data.depth})`,
					}}
				/>

				<div className="px-4 py-2">
					{/* <Author
            author={comment.data.author}
            op={comment.data.is_submitter}
            mod={comment.data.distinguished === "moderator"}
          /> */}
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
							<div className="flex grow items-center justify-end self-end">
								{/* {!isCollapsed ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => console.log(comment)}>
                      <EllipsisHorizontal size={18} />
                    </button>
                    {moment.unix(comment.data.created).fromNow()}
                  </div>
                ) : ( */}
								{/* <ChevronDown size={22} className="text-[var(--gray-4)]" /> */}
								{/* )} */}
							</div>
						</div>
					</div>

					<AnimateHeight height={isCollapsed ? 0 : "auto"}>
						<div>{unesc(comment.data.body)}</div>
					</AnimateHeight>
				</div>
			</IonItem>
			<AnimateHeight height={isCollapsed ? 0 : "auto"}>
				{!!comment.data.replies &&
					comment.data.replies.data.children.map((reply: Reddit.Comment) => (
						<Comment comment={reply} key={reply.id} />
					))}
			</AnimateHeight>
		</>
	);
}
