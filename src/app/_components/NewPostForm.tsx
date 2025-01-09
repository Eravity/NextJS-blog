type NewPostFormProps = {
  id: string;
  onClose: () => void;
};

export default function NewPostForm({ id, onClose }: NewPostFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log({
      title: formData.get('title'),
      description: formData.get('description')
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <form
        id={id}
        onSubmit={handleSubmit}
        className="max-w-2xl w-full p-4 bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg"
      >
        <h2 className="text-neutral-200 text-xl font-semibold mb-4">
          New Post
        </h2>
        <div className="mb-4">
          <label htmlFor="title" className="text-neutral-200 block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 bg-neutral-800 text-neutral-200 rounded border border-neutral-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="text-neutral-200 block mb-2">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full p-2 bg-neutral-800 text-neutral-200 rounded border border-neutral-600"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button 
            type="button" 
            onClick={onClose}
            className="px-3 py-1 bg-neutral-700 rounded"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-3 py-1 bg-amber-500 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
