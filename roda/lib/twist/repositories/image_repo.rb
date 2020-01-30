require 'twist/image_uploader'

module Twist
  module Repositories
    class ImageRepo < Twist::Repository[:images]
      struct_namespace Twist
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }
      commands update: :by_pk

      def find_or_create_image(chapter_id, filename, image_path)
        image = images.where(
          chapter_id: chapter_id,
          filename: filename,
        ).limit(1).one

        if image
          updated_image = update_image(image, image_path)
          return updated_image
        end

        create_image(chapter_id, filename, image_path)
      end

      def by_chapter(chapter_id)
        images.where(chapter_id: chapter_id).to_a
      end

      def by_ids(ids)
        images.where(id: ids).to_a
      end

      private

      def update_image(image, image_path)
        upload = upload_image(image_path)
        update(image.id, image_data: upload.to_json)
      end

      def create_image(chapter_id, filename, image_path)
        upload = upload_image(image_path)
        create(
          chapter_id: chapter_id,
          filename: filename,
          image_data: upload.to_json,
        )
      end

      def upload_image(image_path)
        uploader = ImageUploader.new(:store)
        uploader.upload(File.open(image_path))
      end
    end
  end
end
