class CreateMastodonPosts < ActiveRecord::Migration[8.0]
  def change
    create_table :mastodon_posts do |t|
      t.string :mastodon_id
      t.datetime :posted_at
      t.string :username
      t.string :display_name
      t.text :content
      t.string :avatar_url
      t.integer :replies_count
      t.integer :reblogs_count
      t.integer :favorites_count

      t.timestamps
    end
    add_index :mastodon_posts, :mastodon_id,unique: true
    add_index :mastodon_posts, :posted_at
  end
end
