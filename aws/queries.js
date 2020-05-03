const AWS = require('aws-sdk');

async function getRating(host, userId) {
  const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDBDocumentClient.get({
    TableName: host,
    Key: { userId },
  }).promise();

  return result.Item.rating;
}

async function getAverage(host) {
  const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDBDocumentClient.scan({
    TableName: host,
    ProjectionExpression: "rating",
  }).promise();

  const ratingSum = result.Items.reduce((sum, { rating }) => sum + rating, 0);
  const ratingCount = result.Items.length;

  return ratingSum / ratingCount;
}

async function getDetails(host) {
  const dynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDBDocumentClient.scan({
    TableName: host,
    ProjectionExpression: "rating",
  }).promise();

  const details = result.Items.reduce((accumulator, { rating }) => {
    if (!(rating in accumulator)) {
      accumulator[rating] = 0;
    }
    accumulator[rating] += 1;
    return accumulator;
  }, {});

  return JSON.stringify(details);
}

module.exports = {
  getRating,
  getAverage,
  getDetails,
};
