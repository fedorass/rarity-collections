'use strict';

var uuid = require('uuid');
var AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});


const DEFAULT_PAGE_SIZE = 12;
const LAST_EVALUATED_KEY_HEADER_NAME = 'X-Last-Evaluated-Key';

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'message': 'Could not fetch Countries.'})
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'message': 'Could not fetch Monetary Periods.'})
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

  if (event.headers && event.headers[LAST_EVALUATED_KEY_HEADER_NAME]) {
    params.ExclusiveStartKey = JSON.parse(event.headers[LAST_EVALUATED_KEY_HEADER_NAME]);
  }

  docClient.scan(params, (error, result) => {

    if (error) {
      console.error(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'message': 'Could not fetch Numismatics Coins.'})
      });
    }

    const response = {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'X-Last-Evaluated-Key': JSON.stringify(result.LastEvaluatedKey)
      },
      body: JSON.stringify(result.Items)
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
