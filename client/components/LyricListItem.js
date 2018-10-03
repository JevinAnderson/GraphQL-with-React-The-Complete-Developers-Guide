import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import mutation from '../queries/like-lyric';

class LyricListItem extends Component {
  likeLyric = () => {
    const { id, content, likes, mutate } = this.props;

    mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          content,
          likes: likes + 1
        }
      }
    });
  };

  render = () => (
    <li className="collection-item lyric-list-item">
      {this.props.content}
      <div className="vote-box">
        <i className="material-icons" onClick={this.likeLyric}>
          thumb_up
        </i>
        {this.props.likes}
      </div>
    </li>
  );

  static propTypes = {
    id: PropTypes.string,
    content: PropTypes.string,
    likes: PropTypes.number,
    mutate: PropTypes.func
  };
}

export default graphql(mutation)(LyricListItem);
