import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("rms");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            // let famData = await db.collection("family").insertOne(bodyObject);
            // res.json(famData);
            await db.collection("family").drop()
            let famData = await db.collection("family").insertMany(bodyObject);
            res.json(famData);
            break;
        case "PATCH":
            let bodyUpdateObject = JSON.parse(req.body);
            await db.collection("family").deleteOne({ id: bodyUpdateObject?.id })

            let famDataUpdate = await db.collection("family").insertOne(bodyUpdateObject);
            res.json(famDataUpdate);
            break;
        case "DELETE":
            let bodyDeleteObject = JSON.parse(req.body);
            let famDataDelete = await db.collection("family").deleteOne({ id: bodyDeleteObject?.id })
            res.json(famDataDelete);
            break;
        case "GET":
            const allFam = await db.collection("family").find({}).toArray();
            res.json({ status: 200, data: allFam });
            break;
    }
}