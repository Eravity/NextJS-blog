'use client';

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

const EditingForm: React.FC<EditingFormProps> = ({ params, post, onCancel }) => {
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
      console.error('Form submission error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to update post");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          defaultValue={post.description}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          defaultValue={post.content}
          className="w-full p-2 border rounded min-h-[200px]"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditingForm;
