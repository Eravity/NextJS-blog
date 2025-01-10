"use server";
import { createPost } from "../_lib/data-service";

export async function handleCreatePost(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;

  if (!title || !description || !content) {
    throw new Error('Title, description and some content are required');
  }

  return createPost({ title, description, content, star_count: 0, created_at: new Date().toISOString() });
}
