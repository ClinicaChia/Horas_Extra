const { MongoClient } = require("mongodb");
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    
    const client = new MongoClient(uri)
    await client.connect()
    const db = await client.db("Matriz")
    const collection = await db.collection("horas extra")
    const data = await collection.find({}).toArray()

    const nombres = data.map(item => item.nombre)


    await client.close();

    res.status(200).json({ nombres, data })
  }
  