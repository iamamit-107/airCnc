const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

//middlewares
app.use(bodyParser.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_CONNECTION;

//connecting to the database
const client = new MongoClient(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
});

//route
app.get("/", (req, res) => {
    res.send("We are on home");
});

//add reviews API
app.post("/reviews", (req, res) => {
    const reviews = req.body;
    console.log(reviews);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("aircnc").collection("reviews");
        // perform actions on the collection object
        collection.insert(reviews, (err, result) => {
            err ? console.log(err) : res.send(result.ops[0]);
        });
        console.log("data added");
        client.close();
    });
});

//add house API
app.post("/houses", (req, res) => {
    const houses = req.body;
    console.log(houses);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("aircnc").collection("houses");
        // perform actions on the collection object
        collection.insert(houses, (err, result) => {
            err ? console.log(err) : res.send(result.ops[0]);
        });
        console.log("data added");
        client.close();
    });
});

//get reviews data
app.get("/reviews", (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("aircnc").collection("reviews");
        // perform actions on the collection object
        collection.find().toArray((err, result) => {
            err ? console.log(err) : res.send(result);
        });
        client.close();
    });
});

//get houses data
app.get("/houses", (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("aircnc").collection("houses");
        // perform actions on the collection object
        collection.find().toArray((err, result) => {
            err ? console.log(err) : res.send(result);
        });
        client.close();
    });
});

//listening the port
app.listen(3000, () => {
    console.log("listening");
});
