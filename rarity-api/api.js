'use strict';

var uuid = require('uuid');
var AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});


const DEFAULT_PAGE_SIZE = 12;

module.exports.countries = (event, context, callback) => {
  
  const params = {
    TableName : 'Countries',
    KeyConditionExpression: '#userId = :userId',
    ExpressionAttributeNames:{
        '#userId': 'userId'
    },
    ExpressionAttributeValues: {
        ':userId': event.pathParameters.id
    }
  };

  docClient.query(params, (error, result) => {

    if (error) {
      console.error(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch Countries.'
      });
    }

    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Items)
    }
    callback(null, response);
  });
};


module.exports.periods = (event, context, callback) => {
  const params = {
    TableName: 'MonetaryPeriod',
    IndexName: 'MonetaryPeriodStartYearIndex',
    KeyConditionExpression: '#countryId = :countryId',
    ExpressionAttributeNames:{
        '#countryId': 'countryId'
    },
    ExpressionAttributeValues: {
        ':countryId': event.pathParameters.id
    }
  };

  docClient.query(params, (error, result) => {

    if (error) {
      console.error(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch Monetary Periods.'
      });
    }

    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Items)
    }
    callback(null, response);
  });
};

module.exports.numismatics = (event, context, callback) => {

  const queryParams = event.queryStringParameters || {};

  const pageSize = Number(queryParams.size) || DEFAULT_PAGE_SIZE;

  let lastEvaluatedKey;

  const params = {
    TableName: 'Numismatics',
    IndexName: 'NumismaticsDefaultIndex',
    FilterExpression: '#periodId = :periodId',
    ExpressionAttributeNames:{
        '#periodId': 'periodId'
    },
    ExpressionAttributeValues: {
        ':periodId': event.pathParameters.id
    },
    Limit: pageSize
  };

  if (queryParams.periodId && queryParams.coinId && queryParams.issueDate && queryParams.rate) {
    params.ExclusiveStartKey = {
      'periodId': queryParams.periodId,
      'coinId': queryParams.coinId,
      'issueDate': Number(queryParams.issueDate),
      'rate': Number(queryParams.rate)
    };
  }

  docClient.scan(params, (error, result) => {

    if (error) {
      console.error(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch Numismatics Coins.'
      });
    }

    const body = {
      'content': result.Items,
      'lastEvaluatedKey': result.LastEvaluatedKey
    };

    console.log('Result: ' + result);
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    callback(null, response);
  });
};

/*module.exports.one = (event, context, callback) => {

  const params = {
    TableName : 'Countries',
    KeyConditionExpression: '#userId = :userId AND #countryId = :countryId',
    ExpressionAttributeNames:{
        '#userId': 'userId',
        '#countryId': 'countryId'
    },
    ExpressionAttributeValues: {
        ':userId':'oleksandr.fedoras@gmail.com',
        ':countryId': event.pathParameters.id
    }
  };

  docClient.query(params, (error, result) => {

    if (error) {
      console.error(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch the note.'
      });
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    }
    callback(null, response);
  });

};*/


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
