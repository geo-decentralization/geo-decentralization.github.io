/**
 * Compute Gini coefficient
 * @param {number[]} values
 * @returns {number}
 */
function gini(values) {
  const arr = values.map(Number);

  if (arr.some(v => v < 0)) {
    throw new Error("Values cannot be negative");
  }

  const sum = arr.reduce((a, b) => a + b, 0);
  if (sum === 0) {
    return 0.0;
  }

  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;

  let cumSum = 0;
  let cumTotal = 0;

  for (let i = 0; i < n; i++) {
    cumSum += sorted[i];
    cumTotal += cumSum;
  }

  const giniCoeff = (n + 1 - 2 * (cumTotal / cumSum)) / n;
  return giniCoeff;
}


/**
 * Compute Herfindahl–Hirschman Index (HHI)
 * @param {number[]} values
 * @returns {number}
 */
function hhi(values) {
  const arr = values.map(Number);
  const total = arr.reduce((a, b) => a + b, 0);

  if (total === 0) {
    return 0.0;
  }

  return arr
    .map(v => v / total)
    .reduce((sum, share) => sum + share * share, 0);
}


/**
 * Compute Liveness Coefficient
 * Smallest k such that top-k values sum to >= total / 3
 * @param {number[]} values
 * @returns {number}
 */
function livenessCoefficient(values) {
  const sorted = [...values].map(Number).sort((a, b) => b - a);
  const total = sorted.reduce((a, b) => a + b, 0);

  let partial = 0;
  for (let i = 0; i < sorted.length; i++) {
    partial += sorted[i];
    if (partial >= total / 3) {
      return i + 1;
    }
  }
  return sorted.length;
}


/**
 * Compute Coefficient of Variation (CV)
 * CV = std / mean, return 0 if mean == 0
 * @param {number[]} values
 * @returns {number}
 */
function cv(values) {
  const arr = values.map(Number);
  const n = arr.length;

  if (n === 0) return 0;

  const mean = arr.reduce((a, b) => a + b, 0) / n;
  if (mean === 0) return 0;

  const variance =
    arr.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n - 1);

  const std = Math.sqrt(variance);
  return std / mean;
}
