import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import Header from "./Header";
import List from "./List";

type NotesProps = {
  bookPermalink: string;
};

type NotesState = {
  currentState: string;
};

export class Notes extends React.Component<NotesProps, NotesState> {
  state = {
    currentState: "OPEN",
  };

  showOpenNotes = () => {
    this.setState({ currentState: "OPEN" });
  };

  showClosedNotes = () => {
    this.setState({ currentState: "CLOSED" });
  };

  render() {
    const { bookPermalink } = this.props;
    return (
      <div className="main">
        <Header permalink={bookPermalink} />
        <div className="notes mt-4">
          <div className="mb-4">
            <button className="btn btn-green mr-2" onClick={this.showOpenNotes}>
              Open Notes
            </button>
            <button className="btn btn-red" onClick={this.showClosedNotes}>
              Closed Notes
            </button>
          </div>
          <List state={this.state.currentState} bookPermalink={bookPermalink} />
        </div>
      </div>
    );
  }
}

interface WrappedNotesMatchParams {
  bookPermalink: string;
}

interface WrappedNotesProps
  extends RouteComponentProps<WrappedNotesMatchParams> {}

export default class WrappedNotes extends React.Component<WrappedNotesProps> {
  render() {
    const { bookPermalink } = this.props;
    return <Notes bookPermalink={bookPermalink as string} />;
  }
}
