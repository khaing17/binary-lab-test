import { create } from "zustand";
import { Post } from "./postService";

interface PostStore {
  posts: Post[];
  addPosts: (newPosts: Post[]) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  addPosts: (newPosts: Post[]) =>
    set((state) => ({ posts: [...state.posts, ...newPosts] })),
}));
