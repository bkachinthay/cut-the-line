function sum(numbers = []) {
  return numbers.reduce((s, n) => s + n, 0);
}

export default sum;
