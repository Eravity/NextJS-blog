import supabase from "./supabase";

export type Post = {
  title: string;
  description: string;
  star_count: number;
  id: number;
};

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("Posts")
    .select("*")

  if (error) throw error;
  return data;
};
