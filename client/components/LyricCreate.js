import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import mutation from '../queries/add-lyric';
import query from '../queries/fetch-song';

class LyricCreate extends Component {
  state = {
    content: ''
  };

  clearContent = () => {
    this.setState({ content: '' });
  };

  updateContent = ({ target: { value } }) => {
    this.setState({ content: value });
  };

  onSubmit = event => {
    event.preventDefault();

    const { id, mutate } = this.props;
    const { content } = this.state;

    mutate({
      variables: { id, content },
      refetchQueries: [{ query, variables: { id } }]
    })
      .then(this.clearContent)
      .catch(this.clearContent);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="">Add a lyric</label>
        <input
          value={this.state.content}
          onChange={this.updateContent}
          type="text"
        />
      </form>
    );
  }
}

export default graphql(mutation)(LyricCreate);
