export interface Thing {
	id: string;
	name: string;
	kind: string;
	data: object;
}

export interface Listing {
	before: string | null;
	after: string;
	modhash: string;
	children: Thing[];
}

export interface Votable {
	ups: number;
	downs: number;
	likes: boolean | null;
}

export interface Created {
	created: number;
	created_utc: number;
}

export interface Comment extends Thing, Votable {
	data: Created & {
		id: string;
		approved_by: string | null;
		author: string;
		author_flair_css_class: string;
		author_flair_text: string;
		banned_by: string | null;
		body: string;
		body_html: string;
		edited: boolean | number;
		gilded: number;
		likes: boolean | null;
		link_author: string;
		link_id: string;
		link_title: string;
		link_url: string;
		num_reports: number | null;
		parent_id: string;

		// biome-ignore lint:
		replies: any; // for now

		saved: boolean;
		score: number;
		score_hidden: boolean;
		subreddit: string;
		subreddit_name_prefixed: string;
		subreddit_id: string;
		distinguished: string;
		depth: number;
		locked: boolean;
	};
}

export interface Link extends Omit<Thing, "name" | "id">, Votable, Created {
	data: Link & {
		id: string;
		author: string | null;
		author_flair_css_class: string;
		author_flair_text: string;
		clicked: boolean;
		domain: string;
		hidden: boolean;
		is_self: boolean;
		likes: boolean;
		link_flair_text: string;
		link_flair_css_class: string;
		locked: boolean;
		media: object;
		media_embed: object;
		num_comments: number;
		over_18: boolean;
		permalink: string;
		saved: boolean;
		score: number;
		selftext: string;
		selftext_html: string;
		subreddit: string;
		subreddit_name_prefixed: string;
		subreddit_id: string;
		title: string;
		url: string;
		edited: number;
		distinguished: string;
		stickied: boolean;
		post_hint: "image" | "link" | "hosted:video";
		upvote_ratio: number;
		preview: {
			images: {
				source: {
					width: number;
					height: number;
				};
			}[];
		};
	};
}
