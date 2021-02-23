require("dotenv").config();
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const co = require("co");

let conn = null;

const DB_URL = process.env.DB_URL;
const DB_NAME = "timers";

function errorResponse(callback, err) {
  console.error(err);

  callback(null, {
    statusCode: 500,
    body: JSON.stringify({ error: err }),
  });
}

function successResponse(callback, res) {
  console.log("Saved new timer at:", res.value.id);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(res),
  });
}
const connect = () => {
  return mongoose.connect(`${DB_URL}/timers`);
};


//const Timer = mongoose.model("timer", timer);

exports.handler = async function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  // Check for data
  const data = JSON.parse(event.body);
  if (!data || !data.title || !data.expires) {
    console.log("data error", data);

    return callback(null, {
      statusCode: 400,
      body: "Timer details not provided correctly",
    });
  }
  // Data is good, make the object
  const timer = {
    title: data.title,
    expiresAt: data.expires,
  };
  await run().
    then(res => {
      callback(null, res);
    }).
    catch(error => callback(error));
};
function run() {
  let timer = new mongoose.Schema({
    _id: {
      type: String,
      default: nanoid(6),
    },
    title: String,
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "1d" },
    },
  });
  return co(function* () {
    if (conn == null) {
      conn = yield mongoose.createConnection(`${DB_URL}/timers`, {
        bufferCommands: false,
        bufferMaxEntries: 0,
      });
      conn.model(
        "timers",
        timer
      );
    }

    const M = conn.model("timers");

    const doc = yield M.find();
    const response = {
      statusCode: 200,
      body: JSON.stringify(doc),
    };
    console.log(response)
    return response;
  });
}
  // await connect()
  //   .then(async connection => {
  //     const makeTimer = await Timer.create(timer);
  //     Timer.createIndexes;
  //     return callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify(makeTimer),
  //     });
      
  //   })
  // .catch(e => console.log(e));