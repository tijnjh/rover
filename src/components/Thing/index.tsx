import { unescape as unesc } from "html-escaper";

import type * as Reddit from "@/lib/reddit-types";
import Media from "./subcomponents/Media";

import Flair from "@/components/Flair";
import { IonIcon, IonItem } from "@ionic/react";

import { formatNumber } from "@/lib/utils";
import {
	arrowUp,
	chatbubbleOutline,
	happyOutline,
	timeOutline,
} from "ionicons/icons";
import moment from "moment";
import { useEffect, useState } from "react";

function transformPermalink(url: string) {
	const newUrl = url.split("/").slice(0, 5).join("/");
	return newUrl;
}

export default {
	T3: ({ post }: { post: Reddit.Link }) => {
		const [inDetail, setInDetail] = useState(false);

		useEffect(() => {
			const regex = /^\/r\/.*\/comments\/.*$/;
			setInDetail(regex.test(location.pathname));
		}, []);

		return (
			<IonItem
				detail={false}
				routerLink={
					!inDetail ? transformPermalink(post.data.permalink) : undefined
				}
				lines="none"
				className="mb-2"
				style={{ "--padding-start": "0", "--padding-end": "0" }}
			>
				<div className="my-4 grid grid-cols-1 gap-4">
					<div className="mx-4">
						{unesc(post.data.title)}{" "}
						{!!post.data.link_flair_text && (
							<Flair text={post.data.link_flair_text} />
						)}
					</div>

					{!!post.data.url && <Media post={post} />}

					<div className="mx-4 flex flex-col gap-2 text-(--gray-1) text-[15px]">
						{!!post.data.selftext && (
							<p className={`mt-0 ${!inDetail && "line-clamp-3"}`}>
								{post.data.selftext}
							</p>
						)}

						<div>
							<span className="font-medium">{post.data.subreddit}</span>
							{" by "}
							<span className="font-medium">{post.data.author}</span>
						</div>

						<div className="flex gap-3 font-medium *:flex *:items-center *:gap-1">
							<div>
								<IonIcon size="18" aria-hidden="true" icon={arrowUp} />
								{formatNumber(post.data.score)}
							</div>

							<div>
								<IonIcon
									size="18"
									aria-hidden="true"
									icon={chatbubbleOutline}
								/>

								{formatNumber(post.data.num_comments)}
							</div>
							<div>
								<IonIcon size="18" aria-hidden="true" icon={happyOutline} />
								{post.data.upvote_ratio * 100}%
							</div>

							<div>
								<IonIcon size="18" aria-hidden="true" icon={timeOutline} />
								{moment.unix(post.data.created).fromNow()}
							</div>
						</div>
					</div>
				</div>
			</IonItem>
		);
	},
};
