require "test_helper"

class MastodonPostsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get mastodon_posts_index_url
    assert_response :success
  end
end
