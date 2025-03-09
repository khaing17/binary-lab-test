require 'httparty'

class MastodonFetcher
  include HTTParty
  base_uri 'https://mastodon.social/api/v1/timelines/public'

  def self.fetch_posts(min_id: nil)
    params = {limit: 40}
    params[:min_id] = min_id if min_id
    response = get(base_uri, query: params)
    return [] unless response.success?
    JSON.parse(response.body)
  end
end
