const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLNonNull } = require('graphql')
const { getRating, getAverage, getDetails } = require('./queries');
const { createTable, rate } = require('./mutations');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      rating: {
        args: {
          host: { name: 'host', type: new GraphQLNonNull(GraphQLString) },
          userId: { name: 'userId', type: new GraphQLNonNull(GraphQLString) },
        },
        type: GraphQLInt,
        resolve: (parent, args) => getRating(args.host, args.userId)
      },
      average: {
        args: {
          host: { name: 'host', type: new GraphQLNonNull(GraphQLString) },
        },
        type: GraphQLFloat,
        resolve: (parent, args) => getAverage(args.host)
      },
      details: {
        args: {
          host: { name: 'host', type: new GraphQLNonNull(GraphQLString) },
        },
        type: GraphQLString,
        resolve: (parent, args) => getDetails(args.host)
      },
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      createTable: {
        args: { host: { name: 'host', type: new GraphQLNonNull(GraphQLString), defaultValue: 'unknown' } },
        type: GraphQLString,
        resolve: (parent, args) => createTable(args.host)
      },
      rate: {
        args: {
          host: { name: 'host', type: new GraphQLNonNull(GraphQLString) },
          userId: { name: 'userId', type: new GraphQLNonNull(GraphQLString) },
          rating: { name: 'rating', type: new GraphQLNonNull(GraphQLInt) },
        },
        type: GraphQLString,
        resolve: (parent, args) => rate(args.host, args.userId, args.rating)
      },
    }
  })
})

module.exports.query = (event, context, callback) => graphql(schema, event.queryStringParameters.query)
  .then(
    result => callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(result)
    }),
    err => callback(err)
  )