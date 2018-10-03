import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LyricListItem extends Component {
  render = () => (
    <li className="collection-item lyric-list-item">{this.props.content}</li>
  );

  static propTypes = {
    id: PropTypes.string,
    content: PropTypes.string
  };

  static defaultProps = {};
}

export default LyricListItem;
