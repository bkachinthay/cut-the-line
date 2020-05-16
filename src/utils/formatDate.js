function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    month: "short",
    day: "numeric",
    hour12: true,
  });
}

export default formatDate;
