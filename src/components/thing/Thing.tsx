import type * as Reddit from "@/lib/reddit-types.ts";

export default function Thing({
  thing,
}: {
  thing: Reddit.Link | Reddit.Comment;
}) {
  return <div>thing.kind</div>;
}
