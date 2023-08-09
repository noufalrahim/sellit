import { MongoClient } from "mongodb";
async function handler(req,res){
    if(req.method === "POST") {
        const data = req.body;
        const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/sellIt_database")
        const db = client.db();
        const meetupsCollection = db.collection("userdatas");
        const result =  await meetupsCollection.insertOne(data);
        client.close();
        res.status(201).json({message: "User inserted"})
    }   
 }
export default handler;