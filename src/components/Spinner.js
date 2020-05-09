function Spinner({ isSelected }) {
  return (
    <div
      style={{ borderColor: isSelected
        ? "#fff transparent #fff transparent"
        : "#ff4136 transparent #ff4136 transparent"
      }}
      class="dib w1 h1 lds-dual-ring"
    />
  );
}

export default Spinner;
