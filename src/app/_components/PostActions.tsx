'use client';

import { deletePost } from "@/app/_lib/data-service";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface PostActionsProps {
  postId: number;
}

export default function PostActions({ postId }: PostActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete post:', postId);
      await deletePost(postId);
      toast.success("Post deleted successfully!", {
        duration: 2500,
      });
      router.push('/About/Posts');
      router.refresh();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  return (
    <div className="flex justify-end gap-4">
      <button className="px-3 py-1 bg-amber-500 rounded">Edit</button>
      <button
        className="px-3 py-1 bg-red-500 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
