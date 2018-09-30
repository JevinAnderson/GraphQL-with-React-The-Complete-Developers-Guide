import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
      </div>
    );
  }
}

export default graphql(query)(SongList);
