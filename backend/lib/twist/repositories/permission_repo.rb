module Twist
  module Repositories
    class PermissionRepo < Twist::Repository[:permissions]
      def user_authorized_for_book?(user, book)
        return true if ENV['BYPASS_PERMISSIONS']
        permissions.where(
          user_id: user.id,
          book_id: book.id,
        ).exist?
      end
    end
  end
end
