import Card from "@/app/_components/Card";
import { getPosts } from "@/app/_lib/data-service";
import { Post } from "@/app/_lib/data-service";

export default async function Items() {
  const posts: Post[] = await getPosts();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <div key={post.title}>
          <Card className="font-mono h-full" postId={post.id!.toString()}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-semibold">{post.title}</h1>
              <p>✨{post.star_count}</p>
            </div>
            <p className="text-neutral-400">{post.description}</p>
          </Card>
        </div>
      ))}
    </ul>
  );
}
