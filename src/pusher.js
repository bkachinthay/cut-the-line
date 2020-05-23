import Pusher from "pusher-js";
import config from "../config";

// Pusher.logToConsole = true;

const pusher = {
  _pusher: null,
  channel: null,
  userId: null,
  userName: null,
  init(userName, channelName, events = []) {
    this.connect(userName);
    this.subscribe(
      channelName,
      () => console.log("subscribe sucess"),
      () => console.log("subscribe failed")
    );
    events.forEach(([name, cb]) => this.bind(name, cb));
  },
  destroy() {
    if (this._pusher) {
      this._pusher.disconnect();
    }
    this.channel = null;
    this.userId = null;
    this.userName = null;
  },
  connect(username) {
    if (this._pusher === null) {
      this._pusher = new Pusher(config.pusherKey, {
        cluster: config.pusherCluster,
        forceTLS: true,
        authEndpoint: `${config.apiHost}/auth`,
        authTransport: "jsonp",
        auth: { params: { username } },
      });
      this._pusher.connection.bind("connected", () => {
        this.userId = this._pusher.connection.socket_id;
        this.userName = username;
      });
      // this._pusher.bind_global((...args) =>
      // console.log("global event", ...args)
      // );
    }
  },
  subscribe(channelName, onSuccess, onError) {
    let retryCnt = 0;
    this.channel = this._pusher.subscribe(channelName);
    this._channelName = channelName;
    this.channel.bind("pusher:subscription_succeeded", onSuccess);

    this.channel.bind("client-place-order", (recievedOrder) => {
      console.log("in bind subscribe: ", recievedOrder.userId, recievedOrder);
    });
    if (typeof onError === "function") {
      this.channel.bind("pusher:subscription_error", (status) => {
        if (retryCnt === 3) {
          onError(status);
          return;
        }
        retryCnt += 1;
        this.channel = this._pusher.subscribe(channelName);
      });
    }
  },
  bind(eventName, onConnect) {
    this.channel.bind(eventName, onConnect);
  },
  trigger(eventName, payload) {
    this.channel.trigger(eventName, {
      ...payload,
      userId: this.userId,
      userName: this.userName,
    });
  },
};

export default pusher;
