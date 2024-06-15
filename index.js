
const express=require("express");


const cors=require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app=express();

const port=process.env.PORT ||5000;
// middlewire


app.use(cors())
app.use(express.json())

console.log(process.env.DB_USER)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@atlascluster.aahuy7u.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {


    productManagement=client.db('management').collection('product')

app.get('/product',async(req,res)=>{


    const cursor=productManagement.find();
    const result=await cursor.toArray();
    res.send(result);
})

 app.get('/product/id:',async(req,res)=>{

    const id=req.params.id;
    const query={_id:new ObjectId(id)}
    const options={

        projection:{
            product_name:1,product_image:1,category:1
        }
    }



const result=await productManagement.findOne(query,options)
res.send(result)

 })

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{

    res.send("i go to satkhira")
})

app.listen(port,()=>{

    console.log(`now i stay dhaka ${port}`)
})
