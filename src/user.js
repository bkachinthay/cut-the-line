import getGqlInstance from "utils/gql";

export function login(username, password) {
  let isOk;
  return fetch(`/.netlify/functions/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
    .then((res) => ((isOk = res.ok), res.json()))
    .then((res) => {
      if (isOk && res.userToken) {
        localStorage.setItem("userToken", res.userToken);
        return res;
      }
      localStorage.setItem("userToken", "");
      throw res;
    });
}

const logoutQuery = `mutation {
  logoutUser
}`;

export function logout() {
  const gql = getGqlInstance();
  if (!gql) {
    localStorage.removeItem("userToken");
    return Promise.resolve(true);
  }
  return gql(logoutQuery)().then(
    ({ logoutUser }) => (localStorage.removeItem("userToken"), logoutUser)
  );
}
