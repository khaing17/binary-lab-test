import { MediaAttachment } from "../../components/image-grid";

export interface Post {
  id: number;
  mastodon_id: string;
  posted_at: string;
  username: string;
  display_name: string;
  content: string;
  avatar_url: string;
  sensitive: boolean;
  replies_count: number;
  reblogs_count: number;
  favorites_count: number;
  created_at: string;
  updated_at: string;
  media_attachments: MediaAttachment[];
}

export interface FetchPostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextPage: number;
}

interface FetchPostsParams {
  pageParam?: number;
}

export const fetchPosts = async ({
  pageParam = 1,
}: FetchPostsParams): Promise<FetchPostsResponse> => {
  const response = await fetch(`/mastodon_posts?page=${pageParam}`, {
    headers: { Accept: "application/json" },
  });
  const data = await response.json();
  return {
    posts: data.posts,
    hasMore: data.has_more,
    nextPage: data.current_page + 1,
  };
};
