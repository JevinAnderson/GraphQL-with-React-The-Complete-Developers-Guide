import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetch-songs';
import SongListItem from './SongListItem';

class SongList extends Component {
  render() {
    const { data: { loading = false, songs = [] } = {} } = this.props;

    if (loading)
      return (
        <div className="song-list loading">Songs are currently loading...</div>
      );

    return (
      <div className="song-list">
        <ul className="collection">
          {songs.map(song => (
            <SongListItem key={song.id} refetch={this.props.data.refetch} {...song} />
          ))}
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(query)(SongList);
