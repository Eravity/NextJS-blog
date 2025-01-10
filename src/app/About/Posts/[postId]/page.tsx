import { notFound } from "next/navigation";
import PostActions from "@/app/_components/PostActions";
import { getPost } from "@/app/_lib/data-service";

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

  return (
    <main className="container mx-auto">
      <PostActions 
        postId={postId}
        post={{
          title: post.title,
          description: post.description,
          content: post.content || ""
        }} 
      />
    </main>
  );
}
