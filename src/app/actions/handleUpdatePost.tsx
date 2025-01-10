"use server";

import { updatePost } from "../_lib/data-service";
import { revalidatePath } from "next/cache";

export async function handleEditPost(id: number, formData: FormData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const content = formData.get("content");

    console.log('Updating post with data:', { id, title, description, content });

    if (!title || !description || !content) {
      throw new Error("Missing required fields");
    }

    const updatedPost = await updatePost(id, {
      title: title.toString(),
      description: description.toString(),
      content: content.toString(),
    });

    console.log('Post updated:', updatedPost);

    revalidatePath("/About/Posts");
    revalidatePath(`/About/Posts/${id}`);

    return { success: true };
  } catch (error) {
    console.error('Server action error:', error);
    throw error;
  }
}
