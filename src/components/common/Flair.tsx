import { unescape as unesc } from "html-escaper";

export default function Flair({
	nsfw,
	text,
}: {
	nsfw?: boolean;
	text?: string;
}) {
	if (nsfw) {
		return (
			<>
				<div className="inline w-fit shrink overflow-hidden truncate rounded-lg bg-(--red) px-1.5 py-px font-normal text-sm text-white">
					NSFW
				</div>{" "}
			</>
		);
	}

	if (!text) {
		return null;
	}

	return (
		<>
			<div className="inline w-fit shrink overflow-hidden truncate rounded-lg bg-(--gray-6) px-1.5 py-px font-normal text-(--gray-1) text-sm">
				{unesc(text)}
			</div>{" "}
		</>
	);
}
