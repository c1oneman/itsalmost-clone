require("dotenv").config();
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

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
const Timer = mongoose.model("timer", timer);

exports.handler = async function (event, context, callback) {
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
  connect()
    .then(async connection => {
      const makeTimer = await Timer.create(timer);
      console.log(makeTimer)
      return callback(null, {
        statusCode: 200,
        body: makeTimer,
      });
    }
  .catch(e => console.log(e));
};