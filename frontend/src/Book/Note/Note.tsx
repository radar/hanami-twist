import * as React from "react";
import ReactMarkdown from "react-markdown";
import Gravatar from "react-gravatar";
import moment from "moment";
import { Link } from "@reach/router";

import { Note } from "../Notes/types";
import CloseButton from "./CloseButton";
import OpenButton from "./OpenButton";
import * as styles from "./Note.module.scss";

type ElementNoteProps = Note & {
  bookPermalink: string;
};

type ElementNoteState = {
  state: string;
};

export default class ElementNote extends React.Component<
  ElementNoteProps,
  ElementNoteState
> {
  state = {
    state: this.props.state
  };

  updateState = (state: string) => {
    this.setState({ state: state });
  };

  stateClass() {
    return this.props.state == "open" ? styles.openState : styles.closedState;
  }

  render() {
    const {
      user,
      text,
      createdAt,
      bookPermalink,
      state,
      id,
      number
    } = this.props;
    const time = moment(createdAt).fromNow();

    return (
      <div className={styles.note}>
        <div className="flex">
          <div className={`${styles.avatar} w-34 p-4`}>
            <Gravatar email={user.email} />
          </div>

          <div className={`${styles.noteContainer} w-full`}>
            <div className="row">
              <div className={`${styles.noteHeader} px-4`}>
                <Link to={`/books/${bookPermalink}/notes/${number}`}>
                  {user.name} left note #{number}
                </Link>{" "}
                <small>{time}</small>
                <div className={`${styles.state} ${this.stateClass()}`}>
                  {state}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="pt-4 px-4 border">
                <ReactMarkdown source={text} />
                <div className={styles.buttons}>
                  <CloseButton id={id} updateState={this.updateState} />
                  <OpenButton id={id} updateState={this.updateState} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
