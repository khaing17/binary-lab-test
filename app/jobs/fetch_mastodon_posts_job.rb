class FetchMastodonPostsJob
  include Sidekiq::Worker
  sidekiq_options retry: false, unique_for: 10.minutes, unique: :until_executed

  @@min_id = nil
  MAX_ATTEMPTS = 5

  def perform(retry_count = 0, backoff_seconds = 2, last_attempt_has_post = true)
    Rails.logger.info("Min ID: #{@@min_id}")

    begin
      # raise "Test Exception: Simulating failure"
      posts = MastodonFetcher.fetch_posts(min_id: @@min_id)
      if posts.empty?
        Rails.logger.info("[Mastodon Fetcher] No new posts found.")
        return
      end
      save_posts(posts)
      @@min_id = posts.first["id"]
      Rails.logger.info("[Mastodon Fetcher] Updated Min ID for next fetch: #{@@min_id}")
    rescue => e
          Rails.logger.error("[Mastodon Fetch] Error: #{e.message} (Retry: #{retry_count})")

          Rails.logger.error("[Mastodon Fetch] Exception Details: #{e.inspect}")

          if retry_count >= MAX_ATTEMPTS
            Rails.logger.error("[Mastodon Fetch] Max retries reached. Aborting.")
            return
          end
          sleep_time = backoff_seconds * (2**retry_count)
          Rails.logger.info("[Mastodon Fetch] Retrying in #{sleep_time} seconds...")
          FetchMastodonPostsJob.perform_in(sleep_time, retry_count + 1, backoff_seconds)
      end
  end

  private

  def save_posts(posts)
    return if posts.empty?

    new_posts = posts.map do |post|
      account = post["account"]
      {
        mastodon_id: post["id"],
        posted_at: post["created_at"],
        username: account["username"],
        display_name: account["display_name"],
        avatar_url: account["avatar"],
        content: post["content"],
        sensitive: post["sensitive"],
        replies_count: post["replies_count"],
        reblogs_count: post["reblogs_count"],
        favorites_count: post["favourites_count"],
        created_at: Time.current,
        updated_at: Time.current
      }
    end

    ids = new_posts.map { |p| p[:mastodon_id] }
    existing_ids = MastodonPost.where(mastodon_id: ids).pluck(:mastodon_id).to_set
    filtered_posts = new_posts.reject { |p| existing_ids.include?(p[:mastodon_id]) }

    Rails.logger.info("Filtered #{filtered_posts.count} new posts")

    return if filtered_posts.empty?

    MastodonPost.transaction do
      MastodonPost.insert_all(filtered_posts)

      saved_posts = MastodonPost.where(mastodon_id: filtered_posts.map { |p| p[:mastodon_id] })
      post_map = saved_posts.index_by(&:mastodon_id)

      media_attachments = posts.flat_map do |post|
        next unless post["media_attachments"].present?
        post["media_attachments"].map do |media|
          {
            mastodon_post_id: post_map[post["id"]]&.id,
            mastodon_id:post_map[post["mastodon_id"]]&.mastodon_id,
            mastodon_media_id: media["id"],
            media_type: media["type"],
            url: media["url"],
            preview_url: media["preview_url"],
            meta: media["meta"],
            description: media["description"],
            created_at: Time.current,
            updated_at: Time.current
          }
        end
      end.compact

      MediaAttachment.insert_all(media_attachments) if media_attachments.any?
    end
  end
end
