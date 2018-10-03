import gql from 'graphql-tag';

export const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default query;
