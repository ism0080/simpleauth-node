const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-southeast-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const putData = async (params) => {
    await docClient
        .put(params, function (err, data) {
            if (err) {
                console.log(
                    "Unable to add item. Error JSON:",
                    JSON.stringify(err, null, 2)
                );
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                return data;
            }
        })
        .promise();
};

module.exports = putData;
