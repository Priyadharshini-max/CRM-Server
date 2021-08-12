const mongo = require("../shared/mongo");

const service = {
    createPost(data){
        return mongo.db.collection("register").insertOne(data);
    }
}

module.exports = service;