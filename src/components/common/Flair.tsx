import { unescape } from "@std/html/entities";

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
        <div className="inline bg-(--red) px-1.5 py-px rounded-lg w-fit overflow-hidden font-normal text-white text-sm truncate shrink">
          NSFW
        </div>
        {" "}
      </>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <>
      <div className="inline bg-(--gray-6) px-1.5 py-px rounded-lg w-fit overflow-hidden font-normal text-(--gray-1) text-sm truncate shrink">
        {unescape(text)}
      </div>
      {" "}
    </>
  );
}
