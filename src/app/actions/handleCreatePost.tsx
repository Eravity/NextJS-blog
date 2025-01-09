"use server";
import { createPost } from "../_lib/data-service";

export async function handleCreatePost(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    throw new Error('Title and description are required');
  }

  return createPost({ title, description, star_count: 0 });
}
