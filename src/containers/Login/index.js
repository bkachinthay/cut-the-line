import { useState } from "preact/hooks";
import { connect } from "redux-zero/preact";
import Spinner from "components/Spinner";
import actions from "./actions";

function Login({ loading, message, login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setErrMessage("username required!");
      return;
    } else if (!password) {
      setErrMessage("password required!");
      return;
    }

    setErrMessage("");
    login(username, password);
  };

  const displayMessage = errMessage || message;
  return (
    <form class="pa4 black-80 center" onSubmit={onSubmit}>
      <div class="measure-narrow center">
        <label class="f6 b db mb1" for="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          class="input-reset ba b--light-red pa2 mb3 db w-100 f5"
          value={username}
          onInput={(e) => setUsername(e.target.value)}
        />
        <label class="f6 b db mb2" for="password">
          Password
        </label>
        <input
          type="password"
          class="input-reset ba b--light-red pa2 mb3 db w-100"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
        <p class="h1 ma0 mb2 dark-red b">{displayMessage || ""}</p>
        <button
          class="button-reset fl pv2 ph4 tc b bn pointer w4 tc bg-red white grow"
          type="submit"
        >
          {loading ? <Spinner isSelected /> : "Login"}
        </button>
      </div>
    </form>
  );
}

export default connect(
  ({ login: { loading, message } }) => ({ loading, message }),
  actions
)(Login);
