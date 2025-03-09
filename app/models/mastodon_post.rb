class MastodonPost < ApplicationRecord
  validates :mastodon_id, presence: true, uniqueness: true
  validates :content, presence: true
  has_many :media_attachments, dependent: :destroy
end
