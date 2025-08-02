"use client";

import { handleUpdateTask } from "../actions/handleUpdatePost";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Task } from "@/app/_lib/data-service";

interface EditingFormProps {
  task: Task;
  onCancel: () => void;
  onSave: () => void;
}

const EditingForm: React.FC<EditingFormProps> = ({
  task,
  onCancel,
  onSave,
}) => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await handleUpdateTask(task._id, formData);
      toast.success("Task updated successfully!", {
        style: {
          background: '#1f2937',
          color: '#10b981',
          border: '1px solid #059669',
        }
      });
      onSave();
      router.refresh();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="modern-card max-w-2xl w-full relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-800">
          <h2 className="heading-lg">Edit Task</h2>
          <button 
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all duration-200 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Task Title */}
          <div>
            <label className="block text-neutral-300 text-sm font-medium mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              defaultValue={task.title}
              required
              className="modern-input"
              maxLength={50}
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-neutral-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={task.description || ''}
              rows={3}
              className="modern-input resize-none"
              maxLength={200}
            />
          </div>

          {/* Frequency & Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 text-sm font-medium mb-2">
                Frequency
              </label>
              <select name="frequency" defaultValue={task.frequency} className="modern-input">
                <option value="once">One-time task</option>
                <option value="daily">Daily task</option>
                <option value="weekly">Weekly task</option>
                <option value="monthly">Monthly task</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 text-sm font-medium mb-2">
                Due Date
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ''}
                className="modern-input"
              />
            </div>
          </div>

          {/* Rewards */}
          <div className="modern-card bg-neutral-800 border-neutral-700">
            <h3 className="text-neutral-200 text-sm font-medium mb-4">
              Rewards
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 text-xs font-medium mb-2">
                  ✨ Experience Points
                </label>
                <input
                  type="number"
                  name="xpReward"
                  min="1"
                  max="100"
                  defaultValue={task.xpReward}
                  className="modern-input text-center"
                />
              </div>

              <div>
                <label className="block text-neutral-400 text-xs font-medium mb-2">
                  🪙 Coins
                </label>
                <input
                  type="number"
                  name="coinReward"
                  min="1"
                  max="50"
                  defaultValue={task.coinReward}
                  className="modern-input text-center"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            
            <button 
              type="submit" 
              className="btn-primary flex items-center gap-2"
            >
              <span>💾</span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditingForm;
