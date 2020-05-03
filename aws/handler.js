/* handler.js */
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} = require('graphql')

const AWS = require('aws-sdk');

async function createTable(host) {
  const dynamoDB = new AWS.DynamoDB();
  const params = {
    TableName: host,
    KeySchema: [
      { AttributeName: "userId", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };

  await dynamoDB.createTable(params, function (err, data) {
    if (err) {
      return `Unable to create table. Error JSON: ${JSON.stringify(err, null, 2)}`;
    } else {
      return `Created table. Table description JSON: ${JSON.stringify(data, null, 2)}`;
    }
  }).promise();
}

async function getGreeting(firstName) {
  const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();
  // const result = await dynamoDBDocumentClient.get({
  //   TableName: process.env.DYNAMODB_TABLE,
  //   Key: { firstName },
  // }).promise();
  return `Hello, ${/*result ? result.Item.nickname :*/ firstName}.`;
}

async function getRating(host, userId) {
  const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDBDocumentClient.get({
    TableName: host,
    Key: { userId },
  }).promise();

  return result.Item.rating;
}

async function getAverage(host, userId) {
  const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDBDocumentClient.scan({
    TableName: host,
    ProjectionExpression: "rating",
  }).promise();

  const ratingSum = result.Items.reduce((sum, {rating}) => sum + rating, 0);
  const ratingCount = result.Items.length;

  return ratingSum/ratingCount;
}

async function rate(host, userId, rating) {
  const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();

  await dynamoDBDocumentClient.update({
    TableName: host,
    Key: { userId },
    UpdateExpression: 'SET rating = :rating',
    ExpressionAttributeValues: {
      ':rating': rating,
    }
  }).promise();
}

// Here we declare the schema and resolvers for the query
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType', // an arbitrary name
    fields: {
      // the query has a field called 'greeting'
      greeting: {
        // we need to know the user's name to greet them
        args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString), defaultValue: 'unknown' } },
        // the greeting message is a string
        type: GraphQLString,
        // resolve to a greeting message
        resolve: (parent, args) => getGreeting(args.firstName)
      },
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
          userId: { name: 'userId', type: new GraphQLNonNull(GraphQLString) },
        },
        type: GraphQLFloat,
        resolve: (parent, args) => getAverage(args.host, args.userId)
      },
      createTable: {
        args: { host: { name: 'host', type: new GraphQLNonNull(GraphQLString), defaultValue: 'unknown' } },
        type: GraphQLString,
        resolve: (parent, args) => createTable(args.host)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType', // an arbitrary name
    fields: {
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

// We want to make a GET request with ?query=<graphql query>
// The event properties are specific to AWS. Other providers will differ.
module.exports.query = (event, context, callback) => graphql(schema, event.queryStringParameters.query)
  .then(
    result => callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(result)
    }),
    err => callback(err)
  )