var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-southeast-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const doesEmailExist = async (email) => {
    var params = {
        TableName: "Auth",
        KeyConditionExpression: "#em = :email",
        ExpressionAttributeNames: {
            "#em": "email"
        },
        ExpressionAttributeValues: {
            ":email": email
        }
    };

    return await docClient
        .query(params, (err, data) => {
            if (err) {
            } else {
                data.Items.forEach((item) => {
                    if (item.email === email) {
                        return true;
                    }
                });
                return false;
            }
        })
        .promise();
};

module.exports = doesEmailExist;
