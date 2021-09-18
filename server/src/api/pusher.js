const { Router } = require('express');
const Pusher = require('pusher');
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const query = req.query;
    const socketId = query.socket_id;
    const channel = query.channel_name;
    const username = query.username;
    const callback = query.callback;
    
    const presenceData = {
      user_id: socketId,
      user_info: {
        name: username,
      }
    }

    const auth = JSON.stringify(
      pusher.authenticate(socketId, channel, presenceData)
    );

    const authCallback = callback.replace(/\\"/g,"") + "(" + auth + ");";

    res.set({
      "Content-Type": "application/javascript"
    });
    res.send(authCallback);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
