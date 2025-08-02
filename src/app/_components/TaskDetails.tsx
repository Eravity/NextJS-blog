'use client';

import { Task } from "@/app/_lib/data-service";
import PostActions from "@/app/_components/PostActions";

interface TaskDetailsProps {
  task: Task;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const badge = getFrequencyBadge(task.frequency);

  return (
    <div className="container-main">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className={`badge ${badge.class} mb-4`}>
              {badge.label}
            </div>
            <PostActions task={task} />
          </div>
          
          <h1 className={`heading-xl mb-4 ${
            task.completed ? 'text-neutral-500 line-through' : 'text-neutral-100'
          }`}>
            {task.title}
          </h1>
          
          {task.description && (
            <p className="text-body text-lg mb-6">
              {task.description}
            </p>
          )}
        </div>

        {/* Task Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="modern-card">
            <h3 className="heading-md mb-4">Task Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Status:</span>
                <span className={task.completed ? 'text-green-400' : 'text-yellow-400'}>
                  {task.completed ? '✅ Completed' : '⏳ Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Created:</span>
                <span className="text-neutral-200">{formatDate(task.createdAt)}</span>
              </div>
              {task.dueDate && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Due:</span>
                  <span className="text-neutral-200">{formatDate(task.dueDate)}</span>
                </div>
              )}
              {task.completedAt && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Completed:</span>
                  <span className="text-green-400">{formatDate(task.completedAt)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="modern-card">
            <h3 className="heading-md mb-4">Rewards</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-400">✨ Experience Points</span>
                <span className="text-2xl font-bold text-blue-400">{task.xpReward}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400">🪙 Coins</span>
                <span className="text-2xl font-bold text-yellow-400">{task.coinReward}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
