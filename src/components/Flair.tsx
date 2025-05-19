import { unescape as unesc } from "html-escaper";

export default function Flair({
	nsfw = false,
	text,
}: {
	nsfw?: boolean;
	text: string;
}) {
	return (
		<>
			<div
				className={`inline w-fit shrink overflow-hidden truncate rounded-lg bg-(--gray-6) px-1.5 py-px font-normal text-(--gray-1) text-sm ${nsfw && "bg-(--red) text-white"}`}
			>
				{nsfw ? "NSFW" : unesc(text)}
			</div>{" "}
		</>
	);
}
