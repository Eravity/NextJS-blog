import supabase from "./supabase";

export type Post = {
  title: string;
  description: string;
  star_count: number;
  id?: number;
  content?: string;
};

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("Posts")
    .select("*");

  if (error) throw error;
  return data;
};

// create a new post
export const createPost = async (post: Post): Promise<Post> => {
  const { data, error } = await supabase
    .from("Posts")
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('Failed to create post');
  
  return data;
};

// get a single post
export const getPost = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Post not found');

  return data;
}
