import config from '../config';

export function login(username, password) {
  let isOk;
  // return fetch(`/.netlify/functions/login`, {
  return fetch(`${config.apiEndpoint}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json" 
    }
  })
    .then((res) => ((isOk = res.ok), res.json()))
    .then((res) => {
      if (isOk && res.token) {
        localStorage.setItem("userToken", res.token);
        return res;
      }
      localStorage.setItem("userToken", "");
      throw res;
    });
}

export function logout() {
  localStorage.removeItem("userToken");
}
