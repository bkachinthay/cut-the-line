import Match from "preact-router/match";

function withPath(Comp) {
  return function Wrapper(props) {
    return (
      <Match path="/">{({ path }) => <Comp {...props} path={path} />}</Match>
    );
  };
}

export default withPath;
