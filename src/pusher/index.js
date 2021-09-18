import { bindActions } from "redux-zero/utils";
import Pusher from "pusher-js";
import config from "../../config";
import actions from "./actions";
import store from "../store";

const boundActions = bindActions(actions, store);

// Pusher.logToConsole = true;

const pusher = {
  _pusher: null,
  userId: null,
  userName: null,
  channels: [],
  init(userName, channelNames) {
    this.connect(userName);
    this.channels = [];
    channelNames.forEach((channelName) => {
      this.subscribe(channelName);
    });
  },
  destroy() {
    if (this._pusher) {
      this._pusher.disconnect();
    }
    this.channels = [];
    this.userId = null;
    this.userName = null;
  },
  connect(username) {
    if (this._pusher === null) {
      this._pusher = new Pusher(config.pusherKey, {
        cluster: config.pusherCluster,
        forceTLS: true,
        // authEndpoint: "/.netlify/functions/auth",
        authEndpoint: `${config.apiEndpoint}/api/pusher`,
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
    let channel = this.channels.find((c) => c.name === channelName);
    if (typeof channel === "object") {
      onSuccess(channel.channel);
      return;
    }

    channel = this._pusher.subscribe(`presence-${channelName}`);
    channel.bind("pusher:subscription_succeeded", () => {
      this.channels.push({ name: channelName, channel });
      onSuccess(channel);
    });
    channel.bind("client-order-status-updated", ({ order }) =>
      boundActions.setOrderStatus(order)
    );
    channel.bind("client-queue-length-updated", ({ queue }) =>
      boundActions.setOrdersBefore(queue)
    );
    channel.bind("pusher:subscription_error", (status) => {
      if (typeof onError === "function") {
        onError(status);
      }
    });
  },
  unsubscribe(channelName) {
    this.channels = this.channels.filter((c) => c.name !== channelName);
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
