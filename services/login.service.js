const mongo = require("../shared/mongo");

const service = {
    createPost(data){
        return mongo.db.collection("login").insertOne(data);
    }
}

module.exports = service;