import { formatTimeAgo } from "../lib/utils";
import { type Post } from "../store/posts/postService";
import ImageGrid from "./image-grid";

type Props = {
  post: Post;
};

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className="p-4 text-white bg-gray-800 border-b-[0.1px] border-gray-700">
      <div className="flex items-center gap-2">
        <img
          src={post.avatar_url}
          alt="User"
          className="md:w-10 md:h-10 w-9 h-9 rounded"
        />
        <div className="flex w-full justify-between items-center">
          <div>
            <p className="font-semibold text-sm md:text-md">
              {post.display_name}
            </p>
            <p className="md:text-sm text-xs text-gray-400">@{post.username}</p>
          </div>
          <p className="md:text-sm text-xs text-gray-400">
            {formatTimeAgo(post.posted_at)}
          </p>
        </div>
      </div>
      <p
        className="mt-2 text-gray-300 rich-text mb-3"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {post.media_attachments && (
        <ImageGrid
          images={post.media_attachments}
          sensitivity={post.sensitive}
        />
      )}
    </div>
  );
};

export default Post;
