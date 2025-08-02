'use client';

import { createTask } from "@/app/_lib/data-service";
import { toast } from 'react-hot-toast';

type NewTaskFormProps = {
  onSuccess: () => void;
};

export default function NewTaskForm({ onSuccess }: NewTaskFormProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      
      const taskData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        frequency: (formData.get("frequency") as 'once' | 'daily' | 'weekly' | 'monthly') || 'once',
        xpReward: parseInt(formData.get("xpReward") as string) || 5,
        coinReward: parseInt(formData.get("coinReward") as string) || 1,
        dueDate: formData.get("dueDate") as string || undefined,
      };

      if (!taskData.title) {
        toast.error('Task title is required');
        return;
      }

      await createTask(taskData);
      toast.success('Task created successfully!');
      onSuccess();
    } catch (error) {
      console.error('Task creation failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create task');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Task Title */}
      <div>
        <label className="block text-neutral-300 text-sm font-medium mb-2">
          Task Title *
        </label>
        <input
          type="text"
          name="title"
          required
          placeholder="What needs to be done?"
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
          rows={3}
          placeholder="Add more details about this task..."
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
          <select name="frequency" className="modern-input">
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
              defaultValue="5"
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
              defaultValue="1"
              className="modern-input text-center"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button 
          type="submit" 
          className="btn-primary flex items-center gap-2"
        >
          <span>✨</span>
          Create Task
        </button>
      </div>
    </form>
  );
}
