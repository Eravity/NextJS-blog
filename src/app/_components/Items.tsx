import TaskCard from "@/app/_components/TaskCard";
import { getTasks, Task } from "@/app/_lib/data-service";

export default async function Items() {
  let tasks: Task[] = [];
  let error: string | null = null;

  try {
    tasks = await getTasks();
  } catch (err) {
    console.error('Error fetching tasks:', err);
    error = err instanceof Error ? err.message : 'Failed to load tasks';
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">⚠️ {error}</p>
        <p className="text-neutral-500">
          Please make sure you&apos;re logged in and the API is running.
        </p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">No tasks found.</p>
        <p className="text-sm text-neutral-600 mt-2">
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
