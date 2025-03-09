class AddSensitiveToMastodonPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :mastodon_posts, :sensitive, :boolean
  end
end
