const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: parentValue =>
        axios
          .get(`http://127.0.0.1:3000/companies/${parentValue.id}/users`)
          .then(resp => resp.data)
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: parentValue =>
        axios
          .get(`http://127.0.0.1:3000/companies/${parentValue.companyId}`)
          .then(resp => resp.data)
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) =>
        axios
          .get(`http://127.0.0.1:3000/companies/${args.id}`)
          .then(resp => resp.data)
    },
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
