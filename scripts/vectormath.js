var M = function(a, b) {
  return (a[1] - b[1])/(a[0] - b[0]);
};
var B = function(a, b) {
  return  a[1] - M(a, b) * a[0];   
};
var PM = function(a, b) {
  return -1/M(a, b);
};
var TB = function(m, a) {
  return a[1] - (m * a[0]);
};

var vectAdd = function(v, a) {
  return[v[0] + a[0], v[1] + a[1]];
};
var vectSub = function(v, s) {
  return[v[0] - s[0], v[1] - s[1]];
};
var vectMult = function(v, f) {
  return[v[0] * f, v[1] * f];
};
var vectDiv = function(v, d) {
  return vectMult(v, 1/d);
};
var vectMag = function(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};
var vectNorm = function(v) {
  return vectDiv(v, vectMag(v));
};
var vectRot = function(v, t) {
  return[v[0] * Math.cos(t) - v[1] * Math.sin(t), v[1] * Math.cos(t) + v[0] * Math.sin(t)];
};
var vectMid = function(v1, v2) {
  return[v1[0]/2 + v2[0]/2, v1[1]/2 + v2[1]/2];
};
var vectDist = function(a, b) {
  return vectMag(vectSub(a, b));
};
var vectHead = function(v1, v2){
  return Math.atan2(v2[1] - v1[1], v2[0] - v1[0]);
};
var vectRefl = function(v, a, b) {
  return vectSub(v, vectMult(vectSub(v, [(B(a, b) - TB(PM(a, b), v))/(PM(a, b) - M(a, b)), M(a, b) * (B(a, b) - TB(PM(a, b), v))/(PM(a, b) - M(a, b)) + B(a, b)]), 2));
};
var vectLerp = function(a, b, n) {
  return [a[0] + (b[0] - a[0]) * n,
          a[1] + (b[1] - a[1]) * n];
};

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


