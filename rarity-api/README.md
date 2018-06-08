json-dynamo-putrequest --beautify Countries ./countries.0.json > countries.0.import.json
json-dynamo-putrequest --beautify MonetaryPeriod ./periods.0.json > periods.0.import.json

aws dynamodb batch-write-item --request-items file://[FILE_NAME]