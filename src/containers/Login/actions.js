import { route } from "preact-router";
import { login as loginApi } from "user";

const actions = ({ setState }) => ({
  login({}, username, password) {
    setState({ login: { loading: true, message: "" } });
    return loginApi(username, password)
      .then(
        () => (
          route("/"),
          {
            login: { loading: false, message: "" },
          }
        )
      )
      .catch(
        (err) => (
          console.error("login failed: ", err),
          {
            login: {
              loading: false,
              message: "Login failed! please try again.",
            },
          }
        )
      );
  },
});

export default actions;
