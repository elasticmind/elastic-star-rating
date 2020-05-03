/* handler.js */
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNumber,
  GraphQLNonNull
} = require('graphql')

const AWS = require('aws-sdk');

async function createTable(host) {
  const dynamoDB = new AWS.DynamoDB();
  const params = {
    TableName: host,
    KeySchema: [
      { AttributeName: "userId", KeyType: "HASH" },
      { AttributeName: "rating", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "rating", AttributeType: "N" },
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

// async function rate(userId, rating) {
//   const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();
  
//   await dynamoDBDocumentClient.update({
//     TableName: process.env.DYNAMODB_TABLE,
//     Key: { userId },
//     UpdateExpression: 'SET rating = :rating',
//     ExpressionAttributeValues: {
//       ':rating': rating,
//     }
//   });

//   return process.env.DYNAMODB_TABLE;
// }

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
      changeNickname: {
        args: {
          // we need the user's first name as well as a preferred nickname
          firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) },
          nickname: { name: 'nickname', type: new GraphQLNonNull(GraphQLString) }
        },
        type: GraphQLString,
        // update the nickname
        resolve: (parent, args) => changeNickname(args.firstName, args.nickname)
      },
      // rate: {
      //   args: {
      //     userId: { name: 'userId', type: new GraphQLNonNull(GraphQLString) },
      //     rating: { name: 'rating', type: new GraphQLNonNull(GraphQLNumber) },
      //   },
      //   type: GraphQLString,
      //   resolve: (parent, args) => rate(args.userId, args.rating)
      // }
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