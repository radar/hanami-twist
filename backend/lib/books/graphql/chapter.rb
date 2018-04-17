require_relative 'element'
require_relative 'resolvers/element'

require_relative 'section'
require_relative 'resolvers/section'

module Books
  module GraphQL
    ChapterType = ::GraphQL::ObjectType.define do
      name "Chapter"
      description "A chapter"

      field :id, types.ID
      field :title, !types.String
      field :part, !types.String
      field :position, !types.Int
      field :permalink, !types.String

      field :previousChapter, ChapterType do
        resolve Resolvers::Chapter::PreviousChapter.new
      end

      field :nextChapter, ChapterType do
        resolve Resolvers::Chapter::NextChapter.new
      end

      field :elements, types[ElementType] do
        resolve Resolvers::Element::ByChapter.new
      end

      field :sections, types[SectionType] do
        resolve Resolvers::Section::ByChapter.new
      end
    end
  end
end
