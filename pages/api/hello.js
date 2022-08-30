const { MongoClient } = require("mongodb");
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    
    const data = req.body;
    
    const client = new MongoClient(uri)
    await client.connect()
    const db = await client.db("Matriz")
    const collection = await db.collection("horas extra")

    //incremet +1 total in collection
    
   const prueba = await collection.findOne({ nombre:"Diego Moreno" , registro: {total: 1} })
    console.log(prueba)
    await client.close()

    
    res.status(200).json({ prueba  })
  }