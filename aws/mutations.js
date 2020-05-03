const AWS = require('aws-sdk');

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

module.exports = {
  rate,
  createTable,
};
