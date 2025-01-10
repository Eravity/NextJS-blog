import MarkdownRenderer from "@/app/_components/MarkdownRenderer";
import PostActions from "@/app/_components/PostActions";
import { getPost } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    postId: string;
  };
}

export default async function Page({ params }: PageProps) {
  if (!params.postId) {
    return notFound();
  }

  const postId = parseInt(params.postId, 10);
  const post = await getPost(postId);

  if (!post) {
    return notFound();
  }

  const title = post.title[0].toUpperCase() + post.title.slice(1);

  return (
    <main className="container mx-auto">
      <article>
        <PostActions 
          postId={postId} 
          post={{
            title: post.title,
            description: post.description,
            content: post.content || ''
          }} 
        />
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-xl  mb-8">{post.description}</p>
        <hr className="border-neutral-700 my-5" />
        <MarkdownRenderer content={post.content || ''} />
      </article>
    </main>
  );
}
