import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

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
            <li key={song.id} className="collection-item">
              {song.title}
            </li>
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
