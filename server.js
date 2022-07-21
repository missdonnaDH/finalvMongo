const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
db = require("mongodb").Db;

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
    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        console.log("Switched to " + db.databaseName + " database");
        // document to be inserted
        var doc = { nom: "Roshan", num: "22" };

        // insert document to 'users' collection using insertOne
        const result = db
            .collection("conties")
            .insertOne(doc, function (err, res) {
                if (err) throw err;
                console.log("Document inserted");
                // close the connection to db when you are done with it
                db.close();
                return res.json(result);
            });
    });
});
/*
app.post("/saving", async (req, res) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db("contacts");
        const col = database.collection("conties");
        const data = {
            nom: req.body.nom,
            num: req.body.num,
        };
        const result = await col.insertOne(data);
        console.log(data + "1" + result);
        return res.json(result);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
    res.redirect("/");
});*/

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
