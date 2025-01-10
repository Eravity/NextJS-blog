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
  const [isEditing, setIsEditing] = useState(false);

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

  if (isEditing) {
    return (
      <EditingForm 
        params={{ id: postId }} 
        post={post}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="flex justify-end gap-4">
      <button 
        className="px-3 py-1 bg-amber-500 rounded"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
