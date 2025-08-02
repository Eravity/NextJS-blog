import { notFound } from "next/navigation";
import { getTask } from "@/app/_lib/data-service";
import TaskDetails from "@/app/_components/TaskDetails";

interface TaskDataLoaderProps {
  taskId: string;
}

export default async function TaskDataLoader({ taskId }: TaskDataLoaderProps) {
  let task;
  
  try {
    task = await getTask(taskId);
  } catch (error) {
    console.error("Failed to fetch task:", error);
    return notFound();
  }

  if (!task) {
    return notFound();
  }

  return <TaskDetails task={task} />;
}
