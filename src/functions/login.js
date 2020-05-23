require("dotenv").config({
  path: ".env",
});
const graphql = require("graphql.js");

const gql = graphql(process.env.GQL_URL, {
  alwaysAutodeclare: true,
  asJSON: true,
  debug: true,
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: `Bearer ${process.env.GQL_SERVER_SECRET}`,
  },
});

const login = gql(`mutation ($username: String!, $password: String!){
  loginUser (input: {
    username: $username
    password: $password
  })
}`);

function handler(event, context, callback) {
  const payload = JSON.parse(event.body);
  const { username, password } = payload;

  return login({ username, password })
    .then((res) =>
      res.loginUser
        ? callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              userToken: res.loginUser,
            }),
          })
        : callback(null, { statusCode: 401, body: JSON.stringify(res) })
    )
    .catch((e) =>
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({
          error: e,
        }),
      })
    );
}

module.exports = { handler };
