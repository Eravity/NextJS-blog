import MarkdownRenderer from "@/app/_components/MarkdownRenderer";
import { getPost } from "@/app/_lib/data-service";

export default async function Page({ params }: {
  params: { postId: number }
  searchParams: string }
) {
  const post = await getPost(params.postId);
  const title = post.title.slice().at(0)?.toUpperCase() + post.title.slice(1);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <h2 className="text-justify">{post.description}</h2>
      <hr className="border-neutral-700 my-5" />
      <MarkdownRenderer content={post.content!.toString()}/>
    </div>
  );
}