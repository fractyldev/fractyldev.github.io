var intersection = function(a, b, c, d) {
  var X = (B(c, d) - B(a, b))/(M(a, b) - M(c, d));
  return [X, M(a, b) * X + B(a, b)];
};
var intersecting = function(a, b, c, d) {
  var p = intersection(a, b, c, d);
  return (p[0] >= Math.min(a[0], b[0]) && p[0] <= Math.max(a[0], b[0]) && p[0] >= Math.min(c[0], d[0]) && p[0] <= Math.max(c[0], d[0]));
};
var circleCollidingLine = function(a, b, c, r) {
  if(vectDist(a, c) <= r || vectDist(b, c) <= r) { return true; }
  var m = (B(a, b) - TB(PM(a, b), c))/(PM(a, b) - M(a, b));
  return m > Math.min(a[0], b[0]) && m < Math.max(a[0], b[0]) && vectDist([m, M(a, b) * m + B(a, b)], c) < r;
};
