// Mostly from https://github.com/reddit-archive/reddit/wiki/JSON

export interface Thing {
	/** this item's identifier, e.g. "8xwlg" */
	id: string;

	/** Fullname of comment, e.g. "t1_c3v7f8u" */
	name: string;

	/** All things have a kind. The kind is a String identifier that denotes the object's type. Some examples: Listing, more, t1, t2 */
	kind: string;

	/** A custom data structure used to hold valuable information. This object's format will follow the data structure respective of its kind. See below for specific structures. */
	data: object;
}

export interface Listing {
	/** The fullname of the listing that follows before this page. `null` if there is no previous page. */
	before: string | null;

	/** The fullname of the listing that follows after this page. `null` if there is no next page. */
	after: string;

	/** This modhash is not the same modhash provided upon login. You do not need to update your user's modhash everytime you get a new modhash. You can reuse the modhash given upon login. */
	modhash: string;

	/** A list of `thing`s that this Listing wraps. */
	children: Thing[];
}

export interface Votable {
	/** the number of upvotes. (includes own) */
	ups: number;

	/** the number of downvotes. (includes own) */
	downs: number;

	/** `true` if thing is liked by the user, `false` if thing is disliked, `null` if the user has not voted or you are not logged in */
	likes: boolean | null;
}

export interface Created {
	/** the time of creation in local epoch-second format. ex: `1331042771.0` */
	created: number;

	/** the time of creation in UTC epoch-second format. Note that neither of these ever have a non-zero fraction. */
	created_utc: number;
}

export interface Comment extends Thing, Votable, Created {
	data: {
		/** who approved this comment. null if nobody or you are not a mod */
		approved_by: string | null;

		/** the account name of the poster */
		author: string;

		/** the CSS class of the author's flair. subreddit specific */
		author_flair_css_class: string;

		/** the text of the author's flair. subreddit specific */
		author_flair_text: string;

		/** who removed this comment. null if nobody or you are not a mod */
		banned_by: string | null;

		/** the raw text. this is the unformatted text which includes the raw markup characters such as `**` for bold. `<`, `>`, and `&` are escaped. */
		body: string;

		/** the formatted HTML text as displayed on reddit. For example, text that is emphasised by `*` will now have `<em>` tags wrapping it. Additionally, bullets and numbered lists will now be in HTML list format. **NOTE:** The HTML string will be escaped. You must unescape to get the raw HTML. */
		body_html: string;

		/** `false` if not edited, edit date in UTC epoch-seconds otherwise. **NOTE:** for some old edited comments on reddit.com, this will be set to `true` instead of edit date. */
		edited: boolean | number;

		/** the number of times this comment received reddit gold */
		gilded: number;

		/** how the logged-in user has voted on the comment - `true` = upvoted, `false` = downvoted, `null` = no vote */
		likes: boolean | null;

		/** present if the comment is being displayed outside its thread (user pages, `/r/subreddit/comments/.json`, etc.). Contains the author of the parent link */
		link_author: string;

		/** ID of the link this comment is in */
		link_id: string;

		/** present if the comment is being displayed outside its thread (user pages, `/r/subreddit/comments/.json`, etc.). Contains the title of the parent link */
		link_title: string;

		/** present if the comment is being displayed outside its thread (user pages, `/r/subreddit/comments/.json`, etc.). Contains the URL of the parent link */
		link_url: string;

		/** how many times this comment has been reported, null if not a mod */
		num_reports: number | null;

		/** ID of the thing this comment is a reply to, either the link or a comment in it */
		parent_id: string;

		/** A list of replies to this comment */
		replies: Thing[];

		/** true if this post is saved by the logged in user */
		saved: boolean;

		/** the net-score of the comment */
		score: number;

		/** Whether the comment's score is currently hidden. */
		score_hidden: boolean;

		/** subreddit of thing excluding the /r/ prefix. "pics" */
		subreddit: string;

		/** subreddit of thing including the /r/ prefix. "r/pics" */
		subreddit_name_prefixed: string;

		/** the id of the subreddit in which the thing is located */
		subreddit_id: string;

		/** to allow determining whether they have been distinguished by moderators/admins. `null` = not distinguished. `moderator` = the green [M]. `admin` = the red [A]. `special` = various other special distinguishes http://redd.it/19ak1b */
		distinguished: string;
	};
}

export interface Link extends Omit<Thing, "name" | "id">, Votable, Created {
	data: Link & {
		/** this item's identifier, e.g. "8xwlg" */
		id: string;

		/** the account name of the poster. null if this is a promotional link */
		author: string | null;

		/** the CSS class of the author's flair. subreddit specific */
		author_flair_css_class: string;

		/** the text of the author's flair. subreddit specific */
		author_flair_text: string;

		/** probably always returns false */
		clicked: boolean;

		/** the domain of this link. Self posts will be `self.<subreddit>` while other examples include `en.wikipedia.org` and `s3.amazon.com` */
		domain: string;

		/** true if the post is hidden by the logged in user. false if not logged in or not hidden. */
		hidden: boolean;

		/** true if this link is a selfpost */
		is_self: boolean;

		/** how the logged-in user has voted on the link - `true` = upvoted, `false` = downvoted, `null` = no vote */
		likes: boolean;

		/** the text of the link's flair.  */
		link_flair_text: string;

		/** the CSS class of the link's flair. */
		link_flair_css_class: string;

		/** whether the link is locked (closed to new comments) or not. */
		locked: boolean;

		/** Used for streaming video. Detailed information about the video and it's origins are placed here */
		media: object;

		/** Used for streaming video. Technical embed specific information is found here. */
		media_embed: object;

		/** the number of comments that belong to this link. includes removed comments. */
		num_comments: number;

		/** true if the post is tagged as NSFW. false if otherwise */
		over_18: boolean;

		/** relative URL of the permanent link for this link */
		permalink: string;

		/** true if this post is saved by the logged in user */
		saved: boolean;

		/** the net-score of the link. **note:** A submission's score is simply the number of upvotes minus the number of downvotes. If five users like the submission and three users don't it will have a score of 2. Please note that the vote numbers are not "real" numbers, they have been "fuzzed" to prevent spam bots etc. So taking the above example, if five users upvoted the submission, and three users downvote it, the upvote/downvote numbers may say 23 upvotes and 21 downvotes, or 12 upvotes, and 10 downvotes. The points score is correct, but the vote totals are "fuzzed". */
		score: number;

		/** the raw text. this is the unformatted text which includes the raw markup characters such as `**` for bold. `<`, `>`, and `&` are escaped. Empty if not present. */
		selftext: string;

		/** the formatted escaped HTML text. this is the HTML formatted version of the marked up text. Items that are boldened by `**` or `***` will now have `<em>` or `***` tags on them. Additionally, bullets and numbered lists will now be in HTML list format. **NOTE:** The HTML string will be escaped. You must unescape to get the raw HTML. Null if not present. */
		selftext_html: string;

		/** subreddit of thing excluding the /r/ prefix. "pics" */
		subreddit: string;

		/** subreddit of thing including the /r/ prefix. "r/pics" */
		subreddit_name_prefixed: string;

		/** the id of the subreddit in which the thing is located */
		subreddit_id: string;

		/** the title of the link. may contain newlines for some reason */
		title: string;

		/** the link of this post. the permalink if this is a self-post */
		url: string;

		/** Indicates if link has been edited. Will be the edit timestamp if the link has been edited and return false otherwise. https://github.com/reddit/reddit/issues/581 */
		edited: number;

		/** to allow determining whether they have been distinguished by moderators/admins. `null` = not distinguished. `moderator` = the green [M]. `admin` = the red [A]. `special` = various other special distinguishes http://redd.it/19ak1b */
		distinguished: string;

		/** true if the post is set as the sticky in its subreddit */
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
