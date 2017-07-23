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
