function zpad(n) {
  return typeof n === "number" && n > 0
    ? n / 10 < 1
      ? `0${n}`
      : `${n}`
    : "00";
}
export default zpad;
