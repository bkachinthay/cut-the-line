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
