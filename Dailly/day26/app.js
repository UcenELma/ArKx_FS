const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error));

const db = client.db('mydb');
const collection = db.collection('users');
collection
    .insertMany([{ name: "jey uco", age: "25" },
                { name: "cody rhodes", age: "27" },
                { name: "LA Knight", age: "27" }])
    .then((user) => console.log("User Created Successfully: ", user))
    .catch((error) => console.log("Error: ", error));

    


