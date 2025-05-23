export interface Post {
  id: number;
  title: string;
  content: string;
  author: number;
  author_username: string;
  created_at?: string;
}
export type PostList = Post[];
export type PostCreate = Omit<
  Post,
  "id" | "author" | "author_username" | "created_at"
>;
export type PostUpdate = Pick<Post, "title" | "content">
export interface PostCardProps {
    post:Post;
}