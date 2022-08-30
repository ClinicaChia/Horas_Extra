
const { MongoClient } = require("mongodb");
const uri = process.env.DB_HOST;


export default async function handler(req, res) {
    
    const client = new MongoClient(uri)
    await client.connect()
    const db = await client.db("Matriz")
    const collection = await db.collection("horas extra")

    collection.updateOne({nombre: req.body.nombre},{$set: { registro: req.body.data }})

    const data = await collection.find({}).toArray();
    
    res.status(200).json({ data })
  }
  