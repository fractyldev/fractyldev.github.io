var Timer = {
  timeNow: null,
  timePrev: null,
  update: function() {
    timePrev = timeNow;
    timeNow = new Date.getTime();
  },
  timeElapsed: function() {
    return this.timeNow - this.timePrev;
  }
};
