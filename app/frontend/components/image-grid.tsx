import { useState } from "react";

export interface MediaAttachment {
  id: number;
  mastodon_post_id: number;
  mastodon_id: string | null;
  media_type: "image" | "video" | "audio" | "file";
  url: string;
  preview_url: string;
  meta: {
    small: {
      size: string;
      width: number;
      aspect: number;
      height: number;
    };
    original: {
      size: string;
      width: number;
      aspect: number;
      height: number;
    };
  };
  description: string;
  created_at: string;
  updated_at: string;
  mastodon_media_id: string;
}

type ImageGridProps = {
  images: MediaAttachment[];
  sensitivity: boolean;
};

const ImageGrid: React.FC<ImageGridProps> = ({ images, sensitivity }) => {
  const [revealed, setRevealed] = useState(false);
  const toggleReveal = () => setRevealed(!revealed);

  const renderMedia = (media: MediaAttachment) => {
    return (
      <div className="relative w-full h-full">
        {sensitivity && !revealed && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer z-10"
            onClick={toggleReveal}
          >
            <p className="text-white">Click to reveal</p>
          </div>
        )}
        {media.media_type === "video" ? (
          <video controls className="rounded-lg w-full h-full object-cover">
            <source src={media.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={media.url}
            alt="Media"
            className="rounded-lg w-full h-full object-cover"
          />
        )}
      </div>
    );
  };

  if (images.length === 1) {
    return (
      <div className="relative mt-1">
        {sensitivity && !revealed && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
            onClick={toggleReveal}
          >
            <p className="text-white">Click to reveal</p>
          </div>
        )}
        {renderMedia(images[0])}
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-x-2">
        {images.map((img, i) => (
          <div key={i} className="relative h-80">
            {sensitivity && !revealed && (
              <div
                className="absolute z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                onClick={toggleReveal}
              >
                <p className="text-white">Click to reveal</p>
              </div>
            )}
            {renderMedia(img)}
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-x-1">
        <div className="relative h-80">
          {sensitivity && !revealed && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
              onClick={toggleReveal}
            >
              <p className="text-white">Click to reveal</p>
            </div>
          )}
          {renderMedia(images[0])}
        </div>

        <div className="grid grid-rows-2 gap-y-1">
          {images.slice(1).map((img, i) => (
            <div key={i} className="relative h-38">
              {sensitivity && !revealed && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                  onClick={toggleReveal}
                >
                  <p className="text-white">Click to reveal</p>
                </div>
              )}
              {renderMedia(img)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.slice(0, 4).map((img, i) => (
        <div key={i} className="relative h-40">
          {renderMedia(img)}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
