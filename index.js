const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
// middleware

app.use(cors());
app.use(express.json());
// require("./index.js");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c8lf0v2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("primeDatabase");
    const productCollection = database.collection("products");
    const blogProductCollection = database.collection("blogs");
    const imageCollection = database.collection("images");
    const userCollection = database.collection("users");

    //post product
// user reg....
    app.post("/register", async (req, res) => {
      const user = req.body;

      /* try {
        bcrypt.hash(user.password, saltRounds, async function (err, hash) {
          const newUser = new User({
            email: user.email,
            password: hash,
          });
          const result = await userCollection.insertOne(newUser);
          res.json(result);
        });
      } catch (error) {
        res.status(500).json(error.message);
      } */

      const result = await userCollection.insertOne(user);
      res.json(result);
    });
    // users post api
    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.json(result);
    });
    // get single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const question = await productCollection.findOne(query);
      res.json(question);
    });
    // get all product
    app.get("/product", async (req, res) => {
      const cursor = productCollection.find({});
      const user = await cursor.toArray();
      res.send(user);
    });

    // update product
    app.put("/product", async (req, res) => {
      const product = req.body;
      const filter = { _id: ObjectId(product?._id) };
      const options = { upsert: true };
      const updateDoc = { $set: product };
      const result = await productCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    //delete product

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.json(result);
    });

    // upload single image info
    app.post("/image", async (req, res) => {
      const image = req.body;
      const result = await imageCollection.insertOne(image);
      res.json(result);
    });
    // get image
    app.get("/image", async (req, res) => {
      const cursor = imageCollection.find({});
      const user = await cursor.toArray();
      res.send(user);
    });

    // Blog api 
    // Blog api 
    // Blog api 
    // Blog api 
    // Blog api 
    // Blog api 


     // Blog post api
    //    const blogProductCollection = database.collection("blogs");
     app.post("/blog", async (req, res) => {
      const blog = req.body;
      const result1 = await blogProductCollection.insertOne(blog);
      res.json(result1);
    });
    // get single blog
    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query1 = { _id: ObjectId(id) };
      const question1 = await blogProductCollection.findOne(query1);
      res.json(question1);
    });
    // get all blog
    app.get("/blog", async (req, res) => {
      const cursor1 = blogProductCollection.find({});
      const user1 = await cursor1.toArray();
      res.send(user1);
    });

    // update blog
    app.put("/blog", async (req, res) => {
      const blog = req.body;
      const filter = { _id: ObjectId(blog?._id) };
      const options = { upsert: true };
      const updateDoc = { $set: blog };
      const result = await blogProductCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    //delete product

    app.delete("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await blogProductCollection.deleteOne(query);
      res.json(result);
    });
    








    


  } finally {
    // await client.close();
  }
}


run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("prime server two is running");
});

app.listen(port, () => {
  console.log("server running at port ", port);
});
