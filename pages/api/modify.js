// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { MongoClient } = require("mongodb");
const uri = process.env.DB_HOST;


export default async function handler(req, res) {
  const { Actual, num} = req.body;
  
  const client = new MongoClient(uri)
  await client.connect()
  const db = await client.db("Matriz")
  const collection = await db.collection("horas extra")

  await collection.updateOne({ nombre: Actual }, { $inc: { total: -num } })

  res.status(200).json({ name: 'John Doe' })
}
