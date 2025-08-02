"use server";

import { updateTask } from "../_lib/data-service";
import { revalidatePath } from "next/cache";

export async function handleUpdateTask(id: string, formData: FormData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const frequency = formData.get("frequency");
    const xpReward = formData.get("xpReward");
    const coinReward = formData.get("coinReward");
    const dueDate = formData.get("dueDate");

    console.log('Updating task with data:', { id, title, description, frequency, xpReward, coinReward, dueDate });

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    const updatedTask = await updateTask(id, {
      title: title.toString(),
      description: description.toString(),
      frequency: (frequency?.toString() as 'once' | 'daily' | 'weekly' | 'monthly') || 'once',
      xpReward: parseInt(xpReward?.toString() || '5'),
      coinReward: parseInt(coinReward?.toString() || '1'),
      dueDate: dueDate?.toString() || undefined,
    });

    console.log('Task updated:', updatedTask);

    revalidatePath("/About/Posts");
    revalidatePath(`/About/Posts/${id}`);

    return { success: true };
  } catch (error) {
    console.error('Server action error:', error);
    throw error;
  }
}
