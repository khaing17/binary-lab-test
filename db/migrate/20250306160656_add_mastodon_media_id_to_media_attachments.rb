class AddMastodonMediaIdToMediaAttachments < ActiveRecord::Migration[8.0]
  def change
    add_column :media_attachments, :mastodon_media_id, :string
    add_index :media_attachments, :mastodon_media_id, unique: true
  end
end
