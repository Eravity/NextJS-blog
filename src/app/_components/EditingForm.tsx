"use client";

import { handleEditPost } from "../actions/handleUpdatePost";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditingFormProps {
  params: {
    id: number;
  };
  post: {
    title: string;
    description: string;
    content: string;
  };
  onCancel: () => void;
}

const EditingForm: React.FC<EditingFormProps> = ({
  params,
  post,
  onCancel,
}) => {
  const router = useRouter();
  const { id } = params;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      const result = await handleEditPost(id, formData);

      if (result.success) {
        toast.success("Post updated successfully!");
        router.refresh();
        onCancel();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update post"
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex float-right gap-4">
          <button
            type="submit"
            className="px-3 py-1 bg-amber-500 text-white rounded "
          >
            Save 
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 bg-neutral-700 text-white rounded"
          >
            Cancel
          </button>
        </div>
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          placeholder="Post title"
          className="w-full p-2 bg-neutral-800 outline-none border border-neutral-700 focus:border-amber-500 rounded"
        />
        <input
          type="text"
          name="description"
          defaultValue={post.description}
          placeholder="Post description"
          className="w-full p-2 bg-neutral-800 outline-none border border-neutral-700 focus:border-amber-500 rounded"
        />
        <textarea
          name="content"
          placeholder="Post content"
          defaultValue={post.content}
          className="w-full p-2 bg-neutral-800 outline-none border border-neutral-700 focus:border-amber-500 rounded min-h-[600px]"
        />
      </form>
    </div>
  );
};

export default EditingForm;
