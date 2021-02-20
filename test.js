const coords = [
  { x: 24.907933, y: 67.02421 },
  { x: 24.90798, y: 67.02421 },
  { x: 24.907999, y: 67.02428 },
  { x: 24.90796, y: 67.024296 },
];

const x1 = 24.907933;
const y1 = 67.02421;

const x2 = 24.90798;
const y2 = 67.02421;

const x3 = 24.907999;
const y3 = 67.02432;

const x4 = 24.908014;
const y4 = 67.024297;

const x = 67.024234;
const y = 24.90796;

// Aria of the tringale
function area(x1, y1, x2, y2, x3, y3) {
  return Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + (x3 * (y1 - y2)) / 2.0);
}

// whether point "P" lies the iside the rectangle
function check(x1, y1, x2, y2, x3, y3, x4, y4, x, y) {
  // Calculate area of rectangle ABCD
  const A = area(x1, y1, x2, y2, x3, y3) + area(x1, y1, x4, y4, x3, y3);

  // Calculate area of triangle PAB
  const A1 = area(x, y, x1, y1, x2, y2);

  // Calculate area of triangle PBC
  const A2 = area(x, y, x2, y2, x3, y3);

  // Calculate area of triangle PCD
  const A3 = area(x, y, x3, y3, x4, y4);

  // Calculate area of triangle PAD
  const A4 = area(x, y, x1, y1, x4, y4);

  console.log(A, A1 + A2 + A3 + A4);

  return A === A1 + A2 + A3 + A4;
}

if (check(x, y, x1, y1, x2, y2, x3, y3, x4, y4)) {
  console.log('TRUe');
} else {
  console.log('FALSE');
}
