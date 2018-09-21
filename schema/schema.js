const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) =>
        axios
          .get(`http://127.0.0.1:3000/users/${args.id}`)
          .then(resp => resp.data)
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
