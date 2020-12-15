const putData = require("../dynamodb/put");

const addUser = async (user) => {
    var params = {
        TableName: "Auth",
        Item: {
            email: user.email,
            date: new Date().toISOString(),
            info: {
                name: user.name,
                password: user.password
            }
        }
    };

    return await putData(params);
};

module.exports = addUser;
