const MongoClient = require("mongodb").MongoClient;
const { nanoid } = require("nanoid");

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

const addToDB = async (db, data) => {
  const index = await db.collection('timers').createIndex(
    { expires: 1 },
    { expireAfterSeconds: 10 }
  );
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTION",
  };
  const timers = await db.collection("timers").insertOne(data);
  const returnval = timers.insertedId;
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      data: returnval,
    }),
  };
};

module.exports.handler = async (event, context, callback) => {
  switch (event.httpMethod) {
    case "OPTIONS":
      // To enable CORS
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      };
      return {
        statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
        headers,
        body: "This was a preflight call!",
      };
    case "POST":
      const data = JSON.parse(event.body);
        if (!data || !data.title || !data.expires) {
          console.log("data error", data);
          return callback(null, {
            statusCode: 400,
            headers,
            body: "Timer details not provided correctly",
          });
        }
        var now = new Date();
        var date = new Date(data.expires * 1000);
       if(date.getFullYear > now.getFullYear+10) {
        console.log("data error", data);
        return callback(null, {
          statusCode: 400,
          headers,
          body: "Timer date > 10 years :(",
        });
       }
  const timer = {
    _id: nanoid(6),
    title: data.title,
    expires: date,
  };
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  return addToDB(db, timer);
  }
  // Check for data
 
};
