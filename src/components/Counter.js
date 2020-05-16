import { Fragment } from "preact";
import { Text } from "utils/intl";

function Counter({ cnt = 0, setCount }) {
  return (
    <div class="w4 h2 flex justify-end items-stretch ba b--red">
      {cnt === 0 ? (
        <button
          class="w-100 pointer button-reset bn b bg-red white grow ttu"
          onclick={() => setCount(1)}
        >
          <Text id="counter.add">Add</Text>
        </button>
      ) : (
        <Fragment>
          <button
            class="w-third pointer db button-reset bn b bg-red white grow-large"
            onclick={() => setCount(cnt - 1)}
          >
            -
          </button>
          <span class="db w-third f4 tc b pv1 self-center">{cnt}</span>
          <button
            class="w-third pointer db button-reset bn b bg-red white grow-large"
            onclick={() => setCount(cnt + 1)}
          >
            +
          </button>
        </Fragment>
      )}
    </div>
  );
}

export default Counter;
