'use client';

import { deletePost } from "@/app/_lib/data-service";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import EditingForm from "./EditingForm";

interface PostActionsProps {
  postId: number;
  post: {
    title: string;
    description: string;
    content: string;
  };
}

export default function PostActions({ postId, post }: PostActionsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deletePost(postId);
      toast.success("Post deleted successfully!");
      router.push('/About/Posts');
      router.refresh();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  return (
    <>
      {isEditing ? (
        <EditingForm 
          params={{ id: postId }} 
          post={post}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex justify-end gap-4 mb-4">
          <button 
            className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}
