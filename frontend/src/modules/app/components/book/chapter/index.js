import React, { Component } from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import errorWrapper from 'error_wrapper';
import loadingWrapper from 'loading_wrapper';

import Element from './element';
import {chapterWithData} from './container';


class Chapter extends Component {
  render () {
    const {data: {book}} = this.props;

    const {bookPermalink, defaultBranch: {chapter: {title: chapterTitle, position, part, elements}}} = book;

    return (
      <div className='row'>
        <div id='chapter' className='main col-md-7'>
          <h1><Link to={`/books/${bookPermalink}`}>{book.title}</Link></h1>
          <h2>{position}. {chapterTitle}</h2>
          {elements.map(element => (
            <Element {...element} key={element.id} />
          ))}
        </div>
      </div>
    )
  }
};

export default compose(chapterWithData)(errorWrapper(loadingWrapper(Chapter)));
