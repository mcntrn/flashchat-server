const { MongoClient, ObjectId } = require('mongodb')

//Mongo connection details
const dbName = 'flashchat'
const user = encodeURIComponent(process.env.MONGO_USERNAME)
const password = encodeURIComponent(process.env.MONGO_PWD)
const host = process.env.MONGO_HOST;
const port = "27017";
const authMechanism = 'DEFAULT'
const connectionUrl = `mongodb://${user}:${password}@${host}:${port}/?authMechanism=${authMechanism}`

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useUnifiedTopology: true, useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
})

const getMessages = () => {
    const collection = db.collection('message')
    return collection.find({}).toArray()
}

const createMessage = async (text) => {
    const m = { text: text }
    const collection = db.collection('message')
    let result = await collection.insertOne(m)
    return result.ops[0]
}

module.exports = { init, getMessages, createMessage }
