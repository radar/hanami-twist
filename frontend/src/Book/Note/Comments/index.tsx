import React, { FunctionComponent, useState } from "react";

import QueryWrapper from "../../../QueryWrapper";
import commentsQuery from "./CommentsQuery";
import CommentForm from "./CommentForm";
import { Comment as CommentType } from "../../Notes/types";
import Comment from "./Comment";

type CommentsProps = {
  noteId: string;
  comments: CommentType[];
};

const Comments: FunctionComponent<CommentsProps> = (props) => {
  const [comments, setComments] = useState<CommentType[]>(props.comments);

  const renderComments = () => {
    return comments.map((comment) => <Comment {...comment} key={comment.id} />);
  };

  const addComment = (comment: CommentType) => {
    setComments(comments.concat(comment));
  };

  return (
    <div className="mt-4">
      {renderComments()}
      <CommentForm noteId={props.noteId} addComment={addComment} />
    </div>
  );
};

export default Comments;
