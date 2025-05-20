import type * as Reddit from "@/lib/reddit-types.ts";

export default function Media({
	post,
	className,
}: {
	post: Reddit.Link;
	className?: string;
}) {
	if (post.data.post_hint === "image") {
		return Image({ post, className });
	}
}

function Image({ post, className }: { post: Reddit.Link; className?: string }) {
	return (
		<img
			loading="lazy"
			src={post.data.url}
			alt={`${post.data.subreddit_name_prefixed} - ${post.data.title}`}
			className={`${className} w-full`}
			draggable="false"
			style={{
				aspectRatio: `${post.data.preview.images[0].source.width}/${post.data.preview.images[0].source.height}`,
			}}
		/>
	);
}
