function unique(arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}

export default unique;
