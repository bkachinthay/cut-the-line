import graphql from "graphql.js";
import config from "../../config";

function getGqlInstance() {
  const userToken = localStorage.getItem("userToken");
  return userToken
    ? graphql(config.gqlURL, {
        alwaysAutodeclare: true,
        asJSON: true,
        debug: true,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${userToken}`,
        },
      })
    : null;
}

export default getGqlInstance;
