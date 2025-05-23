import instance from "./axios";
import type { PostUpdate, Post, PostList, PostCreate } from "@typings/postTypes";

export const getPosts = async () => {
  const response = await instance.get<PostList>("posts/");
  return response.data;
};
export const createPost = async (post: PostCreate):Promise<Post> => {
  const response = await instance.post("posts/", post);
  return response.data;
};
export const deletePost = async (id:number):Promise<void> => {
  await instance.delete(`posts/${id}/`);
};
export const updatedPost = async (id:number, updatedPost:PostUpdate):Promise<Post> => {
  const response = await instance.put(`posts/${id}/`, updatedPost);
  return response.data;
};
