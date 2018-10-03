import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { graphql } from 'react-apollo';
import query from '../queries/fetch-song';
import LyricList from './LyricList';
import LyricCreate from './LyricCreate';

class SongDetails extends Component {
  render() {
    const { data: { loading, song = {} } = {} } = this.props;
    if (loading)
      return (
        <div>
          <Link to="/">Back</Link>
          <h3>Song details are loading...</h3>
        </div>
      );

    return (
      <div className="song-details">
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList {...song} />
        <LyricCreate id={song.id} />
      </div>
    );
  }

  static propTypes = {
    params: PropTypes.object,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      song: PropTypes.object
    })
  };
}

export default graphql(query, {
  options: props => ({
    variables: {
      id: props.params.id
    }
  })
})(SongDetails);
