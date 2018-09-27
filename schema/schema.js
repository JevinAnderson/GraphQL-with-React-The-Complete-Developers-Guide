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
    companies: {
      type: new GraphQLList(CompanyType),
      resolve: () => axios.get('http://127.0.0.1:3000/companies')
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) =>
        axios.get(`http://127.0.0.1:3000/companies/${args.id}`)
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => axios.get('http://127.0.0.1:3000/users')
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
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve: (parentValue, { firstName, age, companyId }) =>
        axios.post(`http://127.0.0.1:3000/users`, { firstName, age, companyId })
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve: (parentValue, { id, ...rest }) =>
        axios.patch(`http://127.0.0.1:3000/users/${id}`, rest)
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
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
