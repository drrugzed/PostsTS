import { makeAutoObservable } from "mobx";
import type { Post } from "@typings/postTypes";
class ModalStore {
  constructor() {
    makeAutoObservable(this);
  }

  isOpen: boolean = false;
  isEditMode: boolean = false;
  currentPost: Post | null = null;

  modalOpen(post: Post | null): void {
    this.isOpen = true;
    if (post) {
      // если пост есть то
      this.isEditMode = true; // выставляем флаг редактирования
      this.currentPost = post; // в текущий пост добавляем пост который редачим
    } else {
      this.isEditMode = false;
      this.currentPost = null;
    }
  }
  modalClose(): void {
    this.isOpen = false;
    this.isEditMode = false;
    this.currentPost = null;
  }
}
export default new ModalStore();
