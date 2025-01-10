import MarkdownRenderer from "@/app/_components/MarkdownRenderer";
import PostActions from "@/app/_components/PostActions";
import { getPost } from "@/app/_lib/data-service";

export default async function Page({
  params,
}: {
  params: { postId: string };
  searchParams: string;
}) {
  const postId = parseInt(params.postId, 10);
  const post = await getPost(postId);
  const title = post.title.slice().at(0)?.toUpperCase() + post.title.slice(1);

  return (
    <div>
      <PostActions postId={postId} />
      <div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <h2 className="text-justify">{post.description}</h2>
        <hr className="border-neutral-700 my-5" />
        <MarkdownRenderer content={post.content?.toString() || ""} />
      </div>
    </div>
  );
}
