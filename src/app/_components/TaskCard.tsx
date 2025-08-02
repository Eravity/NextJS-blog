'use client';

import { Task, completeTask } from "@/app/_lib/data-service";
import Link from "next/link";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();

  const handleComplete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (task.completed) return;
    
    try {
      await completeTask(task._id);
      toast.success('Task completed!');
      router.refresh(); // Refresh the page to show updated data
    } catch (error) {
      console.error('Complete task failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to complete task');
    }
  };

  const getFrequencyBadge = (frequency: string) => {
    const badges = {
      once: { label: 'One-time', class: 'badge-info' },
      daily: { label: 'Daily', class: 'badge-success' },
      weekly: { label: 'Weekly', class: 'badge-pending' },
      monthly: { label: 'Monthly', class: 'badge-error' }
    };
    
    return badges[frequency as keyof typeof badges] || badges.once;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const badge = getFrequencyBadge(task.frequency);

  return (
    <Link href={`/About/Posts/${task._id}`}>
      <div className={`modern-card hover-lift cursor-pointer transition-all duration-200 ${
        task.completed ? 'opacity-75 bg-neutral-800' : ''
      }`}>
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className={`badge ${badge.class}`}>
            {badge.label}
          </div>
          
          <button
            onClick={handleComplete}
            disabled={task.completed}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-all duration-200 ${
              task.completed 
                ? 'bg-green-500 border-green-400 text-white' 
                : 'border-neutral-600 text-neutral-400 hover:border-blue-500 hover:text-blue-400'
            }`}
          >
            {task.completed ? '✓' : ''}
          </button>
        </div>

        {/* Title */}
        <h3 className={`heading-md mb-3 ${
          task.completed ? 'text-neutral-500 line-through' : 'text-neutral-100'
        }`}>
          {task.title}
        </h3>
        
        {/* Description */}
        {task.description && (
          <p className="text-body text-sm mb-4 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div className="mb-4">
            <div className="text-muted flex items-center gap-2">
              <span>📅</span>
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-blue-400">✨ {task.xpReward} XP</span>
            <span className="text-yellow-400">🪙 {task.coinReward}</span>
          </div>
          
          <div className="text-muted text-xs">
            {formatDate(task.createdAt)}
          </div>
        </div>

        {/* Completion indicator */}
        {task.completed && (
          <div className="absolute top-2 right-2 text-green-400">
            <span className="text-sm">✅</span>
          </div>
        )}
      </div>
    </Link>
  );
}
