const { MongoClient } = require("mongodb");
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    
    const data = req.body;
    
    const client = new MongoClient(uri)
    await client.connect()
    const db = await client.db("Matriz")
    const collection = await db.collection("horas extra")

    //incremet +1 total in collection
  console.log(data.nombre)
  
   
    await collection.updateOne({ nombre: data.nombre }, { $inc: { total: data.horas } })
    await collection.updateOne({ nombre: data.nombre }, { $push: { registro: data } })


    await client.close()

    
    res.status(200).json({ name: 'John Doe' })
  }
  