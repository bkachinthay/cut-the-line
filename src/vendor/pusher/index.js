import { bindActions } from "redux-zero/utils";
import Pusher from "pusher-js";
import config from "../../../config";
import actions from "./actions";
import store from "../store";

const boundActions = bindActions(actions, store);

// Pusher.logToConsole = true;

const pusher = {
  _pusher: null,
  userId: null,
  userName: null,
  channel: null,
  init(userName, channelName) {
    this.connect(userName);
    this.channel = null;
    this.subscribe(channelName);
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
        // authEndpoint: "/.netlify/functions/auth",
        authEndpoint: `${config.apiEndpoint}/pusher`,
        authTransport: "jsonp",
        auth: { params: { username } },
      });
      this._pusher.connection.bind("connected", () => {
        this.userId = this._pusher.connection.socket_id;
        this.userName = username;
      });
    }
  },
  subscribe(
    channelName,
    onSuccess = () => console.log(`subscribe to ${channelName} sucess`),
    onError = () => console.log(`subscribe to ${channelName} failed`)
  ) {
    let channel = this.channel;
    if (channel) {
      onSuccess(channel);
      return;
    }

    channel = this._pusher.subscribe(`presence-${channelName}`);
    channel.bind("pusher:subscription_succeeded", () => {
      this.channel = channel;
      this._channelName = channelName;
      onSuccess(channel);
    });
    channel.bind("client-order-placed", ({ order }) =>
      boundActions.setOrder(order)
    );
    channel.bind("pusher:subscription_error", (status) => {
      if (typeof onError === "function") {
        onError(status);
      }
    });
  },
  unsubscribe(channelName) {
    this.channel = null;
    this._pusher.unsubscribe(`presence-${channelName}`);
  },
  trigger(channelName, eventName, payload) {
    this.subscribe(channelName, (channel) => {
      channel.trigger(eventName, {
        ...payload,
        userId: this.userId,
        userName: this.userName,
      });
    });
  },
};

export default pusher;
