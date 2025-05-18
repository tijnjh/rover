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
				className={`bg-[var(--gray-6)] overflow-hidden w-fit inline truncate shrink text-sm font-normal px-1.5 py-px rounded-lg text-[var(--gray-1)]
          ${nsfw && "bg-[var(--red)] text-white"}`}
			>
				{nsfw ? "NSFW" : unesc(text)}
			</div>{" "}
		</>
	);
}
