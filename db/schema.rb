# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_08_100506) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "mastodon_posts", force: :cascade do |t|
    t.string "mastodon_id"
    t.datetime "posted_at"
    t.string "username"
    t.string "display_name"
    t.text "content"
    t.string "avatar_url"
    t.integer "replies_count"
    t.integer "reblogs_count"
    t.integer "favorites_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "sensitive"
    t.index ["mastodon_id"], name: "index_mastodon_posts_on_mastodon_id", unique: true
    t.index ["posted_at"], name: "index_mastodon_posts_on_posted_at"
  end

  create_table "media_attachments", force: :cascade do |t|
    t.bigint "mastodon_post_id", null: false
    t.string "mastodon_id"
    t.string "media_type"
    t.string "url"
    t.string "preview_url"
    t.jsonb "meta"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mastodon_media_id"
    t.index ["mastodon_media_id"], name: "index_media_attachments_on_mastodon_media_id", unique: true
    t.index ["mastodon_post_id"], name: "index_media_attachments_on_mastodon_post_id"
  end

  add_foreign_key "media_attachments", "mastodon_posts"
end
