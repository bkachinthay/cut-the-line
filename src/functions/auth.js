require("dotenv").config({
  path: ".env",
});
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

exports.handler = function (event, context, callback) {
  const query = event.queryStringParameters;

  console.log("pusher app id : ", process.env.PUSHER_APP_ID);
  const presenceData = {
    user_id: query.socket_id,
    user_info: {
      name: query.username,
    },
  };

  const auth = JSON.stringify(
    pusher.authenticate(query.socket_id, query.channel_name, presenceData)
  );
  const authCallback = query.callback.replace(/"/g, "") + "(" + auth + ")";

  console.log("auth : ", query, auth, authCallback);
  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/javascript" },
    body: authCallback,
  });
};
