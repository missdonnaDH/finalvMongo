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

        // Query for a movie that has the title 'Back to the Future'
        //const query = { genres: "Comedy", poster: { $exists: true } };
        /*  const cursor = await collection.aggregate([
            // { $match: query },
            { $sample: { size: 1 } },
            {
                $project: {
                    nom: 1,
                    num: 1,
                },
            },
        ]);*/
        const cursor = await collection.find({}).toArray();
        //const movie = await cursor.next();
        console.log(cursor + " !!");
        return res.json(cursor);
    } catch (err) {
        console.log(err);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
