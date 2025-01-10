import supabase from "./supabase";

export type Post = {
  title: string;
  description: string;
  star_count: number;
  id?: number;
  content?: string;
  created_at: string;
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

// delete a post
export const deletePost = async (id: number): Promise<void> => {
  // First verify post exists
  const { data: existingPost } = await supabase
    .from("Posts")
    .select()
    .eq("id", id)
    .single();

  if (!existingPost) {
    throw new Error(`Post with id ${id} not found`);
  }

  const { error } = await supabase
    .from("Posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error('Supabase delete error:', error);
    throw new Error(`Failed to delete post: ${error.message}`);
  }
};

// update a post
export const updatePost = async (id: number, post: Post): Promise<Post> => {
  const { data, error } = await supabase
    .from("Posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('Failed to update post');

  return data;
};
