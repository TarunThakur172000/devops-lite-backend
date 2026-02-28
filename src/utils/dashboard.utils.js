const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const isSameMonth = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth()
  );
};

const calculateP95 = (arr) => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.floor(0.95 * sorted.length);
  return sorted[index];
};

module.exports = { isSameDay, isSameMonth, calculateP95 };