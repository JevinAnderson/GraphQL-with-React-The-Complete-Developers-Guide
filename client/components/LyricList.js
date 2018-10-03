import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LyricListItem from './LyricListItem';

class LyricList extends Component {
  render() {
    return (
      <ul className="collection lyric-list">
        {this.props.lyrics.map(lyric => (
          <LyricListItem key={lyric.id} {...lyric} />
        ))}
      </ul>
    );
  }

  static propTypes = {
    lyrics: PropTypes.array
  };

  static defaultProps = {
    lyrics: []
  };
}

export default LyricList;
