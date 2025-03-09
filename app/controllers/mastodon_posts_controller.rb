class MastodonPostsController < ApplicationController
  def index
    page = (params[:page] || 1).to_i
    cache_version = MastodonPost.maximum(:updated_at)&.to_s || "no_posts"
    cache_key = "mastodon_posts/page/#{page}/#{cache_version}"

    respond_to do |format|
      format.json do
        cached_data = Rails.cache.read(cache_key)

        if cached_data
          Rails.logger.info "✅ Serving cached data for key #{cache_key}"
          render json: cached_data
          return
        end

        Rails.logger.info "❌ Cache miss for key #{cache_key}, fetching from DB"
        posts = MastodonPost.includes(:media_attachments).order(posted_at: :desc).page(page).per(20)

        response_data = {
          posts: posts.as_json(include: :media_attachments),
          has_more: posts.next_page.present?,
          current_page: posts.current_page
        }
        Rails.logger.info "📝 Writing data to cache with key #{cache_key}"
          Rails.cache.write(cache_key, response_data, expires_in: 4.minutes)
        render json: response_data
      end

      format.html do
        posts = MastodonPost.includes(:media_attachments).order(posted_at: :desc).page(page).per(20)
        render inertia: "Home"
      end
    end
  end
end
