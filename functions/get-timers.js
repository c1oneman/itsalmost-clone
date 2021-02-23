const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.DB_URL;
const DB_NAME = "timers";

let cachedDb = null;

const connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const queryDatabase = async (db,id) => {
  const timer = await db.collection("timers").findOne({_id:id});
  console.log(timer)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Content-Type": "application/json",
  };
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(timer),
  };
};

module.exports.handler = async (event, context) => {
   const headers = {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Headers": "Content-Type",
     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
   };
  switch (event.httpMethod) {
    case "OPTIONS":
      // To enable CORS
     
      return {
        statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
        headers,
        body: "This was a preflight call!",
      };
    case "POST":
      const data = JSON.parse(event.body);
      if (!data || !data.id) {
        console.log("data error", data);
          return callback(null, {
            statusCode: 400,
            headers,
            body: "Timer details not provided correctly",
          });
      }
      context.callbackWaitsForEmptyEventLoop = false;
      const db = await connectToDatabase(MONGODB_URI);
      console.log(data.id)
      return queryDatabase(db, data.id);
    };
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  
};
