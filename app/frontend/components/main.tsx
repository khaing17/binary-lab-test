import { useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import { usePostStore } from "../store/posts/postStore";
import { useInView } from "react-intersection-observer";
import { Earth, LoaderCircle } from "lucide-react";

import Post from "./post";

const Main = () => {
  const { posts, addPosts } = usePostStore();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (data) {
      const newPost = data.pages[data.pages.length - 1].posts;
      addPosts(newPost);
    }
  }, [data, addPosts]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="main md:max-w-[600px] md:min-w-[600px] min-w-screen max-w-full mb-4">
      <div className="flex flex-col gap-4 border-[0.1px] w-full flex-nowrap border-gray-700">
        <div
          className="sticky top-0 z-20 bg-gray-800 border-b-[0.1px] py-4 px-2 border-gray-700 cursor-pointer"
          onClick={scrollToTop}
        >
          <div className="flex items-center space-x-2">
            <Earth />
            <p className="font-semibold text-lg">Live Feeds</p>
          </div>
        </div>
        {posts.length === 0 && !isFetchingNextPage && (
          <div className="w-full h-screen flex items-center justify-center py-10 text-gray-400">
            No posts yet.
          </div>
        )}
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
        {isFetchingNextPage && (
          <div className="w-full flex items-center justify-center py-4">
            <LoaderCircle className="animate-spin w-10 h-10" />
          </div>
        )}
      </div>
      <div ref={ref} />
    </div>
  );
};

export default Main;
