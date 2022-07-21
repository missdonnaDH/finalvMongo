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
    const data = {
        nom: req.body.nom,
        num: req.body.num,
    };
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db("contacts");
        const col = database.collection("conties");

        const result = await col.insertOne(data, (err, data) => {
            if (err) {
                res.redirect("error.html");
            } else {
                res.redirect("success.html");
            }
            return res.json(result);
        });
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
