const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://xene:HHez1wpLFRCUJCqw@essay-cluster.ah07px7.mongodb.net/contacts?retryWrites=true&w=majority";

// use the express-static middleware
app.use(express.static("public"));

// define the first route
app.get("/api/movie", async function (req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db("contacts");
        const collection = database.collection("conties");
        const cursor = await collection.find({}).toArray();
        return res.json(cursor);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
});
app.post("/saving", async (req, res) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db("contacts");
        const collection = database.collection("conties");
        await collection.insertOne(req.body);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
