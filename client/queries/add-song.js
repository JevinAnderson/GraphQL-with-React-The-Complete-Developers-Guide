import gql from 'graphql-tag';

export const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

export default mutation;
