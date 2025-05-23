import { makeAutoObservable } from "mobx";
import * as api from "@api/postApi";
import type {
  PostList,
  Post,
  PostUpdate,
  PostCreate,
} from "@typings/postTypes";

class postStore {
  posts: PostList = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.loadPosts();
  }

  async loadPosts(): Promise<void> {
    this.isLoading = true;

    try {
      const res = await api.getPosts();
      this.posts = res;
    } catch (error) {
      console.error("Ошибка загрузки постов", error);
    } finally {
      this.isLoading = false;
    }
  }
  async createPost(post: Post | PostCreate) {
    try {
      const res = await api.createPost(post);
      this.posts.push(res);
    } catch (error) {
      console.error("Ошибка создания поста", error);
    }
  }

  prepareUpdatedPost(currentPost: Post, updates: PostUpdate): Post {
    return {
      ...currentPost,
      ...updates,
    };
  }
  async updatedPost(id: number, updatedPost: Post) {
    try {
      const res = await api.updatedPost(id, updatedPost);
      this.posts = this.posts.map((p) => (p.id === id ? res : p));
    } catch (error) {
      console.error("Ошибка обновления поста", error);
    }
  }

  async deletePost(postId: number) {
    try {
      await api.deletePost(postId);
      this.posts = this.posts.filter((p) => p.id !== postId);
    } catch (error) {
      console.error("Ошибка удаления поста", error);
      alert("Вы не можете удалить этот пост");
    }
  }
}
const PostStore = new postStore();
export default PostStore;
