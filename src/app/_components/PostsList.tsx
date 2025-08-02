'use client';

import TaskCard from "./TaskCard";
import { useState } from "react";
import NewTaskForm from "./NewTaskForm";
import type { Task } from "@/app/_lib/data-service";

interface PostsListProps {
  initialTasks: Task[];
}

export default function PostsList({ initialTasks }: PostsListProps) {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  return (
    <div className="container-main">
      {/* Header */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="heading-xl mb-3">Task Manager</h1>
            <p className="text-neutral-400 text-lg">
              Manage your tasks and stay productive
            </p>
          </div>
          <button
            onClick={() => setShowNewTaskForm(true)}
            className="btn-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Task
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="modern-card text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {initialTasks.length}
            </div>
            <div className="text-sm text-neutral-400">Total Tasks</div>
          </div>
          <div className="modern-card text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {initialTasks.filter((task: Task) => task.completed).length}
            </div>
            <div className="text-sm text-neutral-400">Completed</div>
          </div>
          <div className="modern-card text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">
              {initialTasks.filter((task: Task) => !task.completed).length}
            </div>
            <div className="text-sm text-neutral-400">Pending</div>
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      {showNewTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="modern-card max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-md">Create New Task</h2>
              <button
                onClick={() => setShowNewTaskForm(false)}
                className="text-neutral-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <NewTaskForm onSuccess={() => setShowNewTaskForm(false)} />
          </div>
        </div>
      )}

      {/* Tasks Grid */}
      <div className="space-y-4">
        {initialTasks.length === 0 ? (
          <div className="modern-card text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="heading-md mb-3">No tasks yet</h3>
            <p className="text-neutral-400 mb-6">
              Create your first task to get started with productivity tracking
            </p>
            <button
              onClick={() => setShowNewTaskForm(true)}
              className="btn-primary"
            >
              Create First Task
            </button>
          </div>
        ) : (
          <>
            {/* Active Tasks */}
            {initialTasks.some((task: Task) => !task.completed) && (
              <div className="mb-8">
                <h2 className="heading-lg mb-4 flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  Active Tasks ({initialTasks.filter((task: Task) => !task.completed).length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {initialTasks
                    .filter((task: Task) => !task.completed)
                    .map((task: Task) => (
                      <TaskCard key={task._id} task={task} />
                    ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {initialTasks.some((task: Task) => task.completed) && (
              <div>
                <h2 className="heading-lg mb-4 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Completed Tasks ({initialTasks.filter((task: Task) => task.completed).length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {initialTasks
                    .filter((task: Task) => task.completed)
                    .map((task: Task) => (
                      <TaskCard key={task._id} task={task} />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
