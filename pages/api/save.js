const { MongoClient } = require("mongodb");
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    
    const {Data,Index} = req.body;
    const data = Data;
    const client = new MongoClient(uri)
    await client.connect()
    const db = await client.db("Matriz")
    const collection = await db.collection("horas extra")

    //incremet +1 total in collection

    console.log(req.body)
    if(Index >= 0){

      const query = await collection.findOne({ nombre: data.nombre});
      let registro = query.registro;

      registro = registro.map( (el,index) => {
        if(index == Index) {
          return data;
        }
        return el;
      })

      await collection.updateOne({ nombre: data.nombre},{$set:{registro}})
    }

    else{
      await collection.updateOne({ nombre: data.nombre }, { $push: { registro: data } })
    }
    //

    const query = await collection.find({}).toArray()
    await client.close()

    
    res.status(200).json({ query})
  }
  