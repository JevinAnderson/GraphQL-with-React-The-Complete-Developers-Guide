import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import mutation from '../queries/delete-song';
import query from '../queries/fetch-songs';

class SongListItem extends Component {
  delete = () => {
    const { id } = this.props;

    this.props
      .mutate({
        variables: { id }
      })
      .then(this.props.refetch);
  };

  render = () => (
    <li className="collection-item">
      <Link to={`songs/${this.props.id}`}>{this.props.title}</Link>
      <i className="material-icons" onClick={this.delete}>
        delete
      </i>
    </li>
  );

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    refetch: PropTypes.func,
    data: PropTypes.shape({
      mutate: PropTypes.func
    })
  };
}

export default graphql(mutation)(SongListItem);
