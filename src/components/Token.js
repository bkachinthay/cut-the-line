import zpad from "utils/zpad";

function Token({ value = 0 }) {
  return (
    <div class="inline-flex flex-column justify-start">
      <span class="db f7 tc b blue">Token no</span>
      <span
        class={`db br-100 pa0 bw2 ba h3 w3 b--blue flex justify-center items-center black ${
          value < 100 ? "f1" : value < 1000 ? "f2" : "f3"
        } lh-solid`}
      >
        {zpad(value)}
      </span>
    </div>
  );
}

export default Token;
