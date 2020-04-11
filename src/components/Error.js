import { Link } from "preact-router/match";

function Error({ type, url }) {
  return (
    <div>
      <h1>Error {type}</h1>
      <pre>{url}</pre>
      <Link href="/">Go back home</Link>
    </div>
  );
}

export default Error;
