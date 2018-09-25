const graphql = require('graphql');
const axios = require('../axios');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
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
        axios.get(`http://127.0.0.1:3000/companies/${parentValue.id}/users`)
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
        axios.get(`http://127.0.0.1:3000/companies/${parentValue.companyId}`)
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
        axios.get(`http://127.0.0.1:3000/companies/${args.id}`)
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) =>
        axios.get(`http://127.0.0.1:3000/users/${args.id}`)
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve: (parentValue, { firstName, age, companyId }) =>
        axios.post(`http://127.0.0.1:3000/users`, { firstName, age, companyId })
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, { id }) =>
        axios.delete(`http://127.0.0.1:3000/users/${id}`)
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
