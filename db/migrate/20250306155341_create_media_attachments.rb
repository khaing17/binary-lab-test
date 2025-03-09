class CreateMediaAttachments < ActiveRecord::Migration[8.0]
  def change
    create_table :media_attachments do |t|
      t.references :mastodon_post, null: false, foreign_key: true
      t.string :mastodon_id
      t.string :media_type
      t.string :url
      t.string :preview_url
      t.jsonb :meta
      t.text :description

      t.timestamps
    end
  end
end
