module Twist
  module Repositories
    class CommentRepo < Twist::Repository[:comments]
      def by_note_id(id)
        comments.where(note_id: id).to_a
      end
    end
  end
end