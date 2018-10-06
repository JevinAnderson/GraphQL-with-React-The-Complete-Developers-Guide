import gql from 'graphql-tag';

export const mutation = gql`
  mutation CreateLyric($id: ID, $content: String) {
    addLyricToSong(content: $content, songId: $id) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default mutation
