'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { deleteTask, completeTask, Task } from '@/app/_lib/data-service';
import EditingForm from './EditingForm';

interface PostActionsProps {
  task: Task;
}

export default function PostActions({ task }: PostActionsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleComplete = async () => {
    if (task.completed) return;
    
    setIsCompleting(true);
    try {
      await completeTask(task._id);
      toast.success(`Task completed! +${task.xpReward} XP`, {
        style: {
          background: '#1f2937',
          color: '#10b981',
          border: '1px solid #059669',
        }
      });
      router.refresh();
    } catch (error) {
      console.error('Complete error:', error);
      toast.error('Failed to complete task');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setIsDeleting(true);
    try {
      await deleteTask(task._id);
      toast.success('Task deleted successfully!', {
        style: {
          background: '#1f2937',
          color: '#10b981',
          border: '1px solid #059669',
        }
      });
      router.push('/About/Posts');
      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <EditingForm
        task={task}
        onCancel={() => setIsEditing(false)}
        onSave={() => {
          setIsEditing(false);
          router.refresh();
        }}
      />
    );
  }

  return (
    <div className="flex gap-3">
      {!task.completed && (
        <button
          onClick={handleComplete}
          disabled={isCompleting}
          className="btn-primary flex items-center gap-2"
        >
          {isCompleting ? (
            <>
              <div className="loading-spinner"></div>
              Completing...
            </>
          ) : (
            <>
              <span>✓</span>
              Complete Task
            </>
          )}
        </button>
      )}
      
      <button
        onClick={() => setIsEditing(true)}
        className="btn-secondary"
      >
        Edit
      </button>
      
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="btn-danger flex items-center gap-2"
      >
        {isDeleting ? (
          <>
            <div className="loading-spinner"></div>
            Deleting...
          </>
        ) : (
          <>
            <span>🗑️</span>
            Delete
          </>
        )}
      </button>
    </div>
  );
}
