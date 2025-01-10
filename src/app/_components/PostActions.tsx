'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { deletePost } from '@/app/_lib/data-service';
import EditingForm from './EditingForm';
import MarkdownRenderer from '@/app/_components/MarkdownRenderer';

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
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(postId);
      toast.success('Post deleted successfully!');
      router.push('/About/Posts');
      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete post');
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

  // Not editing: show post content and actions
  const title = post.title[0].toUpperCase() + post.title.slice(1);
  return (
    <>
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-xl mb-8">{post.description}</p>
      <hr className="border-neutral-700 my-5" />
      <MarkdownRenderer content={post.content} />
    </>
  );
}
