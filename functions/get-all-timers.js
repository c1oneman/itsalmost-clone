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

const queryDatabase = async (db) => {
  const timer = await db.collection("timers").find();
  console.log(timer);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Content-Type": "application/json",
  };
  if (timer) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(timer),
    };
  } else {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({message: "Timer does not exist."}),
    };
  }
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
    default:
      context.callbackWaitsForEmptyEventLoop = false;
      const db = await connectToDatabase(MONGODB_URI);
      return queryDatabase(db);
  }
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
};
