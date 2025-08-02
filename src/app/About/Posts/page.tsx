import PostsList from "@/app/_components/PostsList";
import { getTasks, type Task } from "@/app/_lib/data-service";

export default async function TasksPage() {
  let tasks: Task[];
  
  try {
    tasks = await getTasks();
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    tasks = [];
  }

  return <PostsList initialTasks={tasks} />;
}