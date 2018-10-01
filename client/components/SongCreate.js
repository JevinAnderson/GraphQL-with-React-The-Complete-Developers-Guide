import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

class SongCreate extends Component {
  state = {
    title: ''
  };

  updateTitle = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  submit = event => {
    event.preventDefault();

    if (this.submitting) return;
    this.submitting = true;

    this.props
      .mutate({
        variables: {
          title: this.state.title
        }
      })
      .then(this.onSuccess)
      .catch(this.onError);
  };

  onSuccess = () => {
    this.submitting = false;
    hashHistory.push('/');
  };

  onError = () => {
    this.submitting = false;
  };

  render = () => (
    <div className="">
      <Link to="/">Back</Link>
      <form onSubmit={this.submit}>
        <label htmlFor="">Song Title:</label>
        <input
          type="text"
          value={this.state.title}
          onChange={this.updateTitle}
        />
      </form>
    </div>
  );
}

export default graphql(mutation)(SongCreate);
