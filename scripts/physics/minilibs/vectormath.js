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
var vectMagSq = function(v) {
  return v[0] * v[0] + v[1] * v[1];
};
var vectLimit = function(v, m) {
  if(vectMag(v) > m) {
    return vectMult(vectNorm(v), m);
  }
  return v;
};

