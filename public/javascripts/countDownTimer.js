function CountDownTimer(granularity) {
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
  this.timeoutId = null;
}

CountDownTimer.prototype.start = function (duration) {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
    that = this,
    timeLeft, obj;

  (function timer() {
    timeLeft = duration - (((Date.now() - start) / 1000) | 0);

    if (timeLeft > 0) {
      that.timeoutId = setTimeout(timer, that.granularity);
    } else {
      timeLeft = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(timeLeft);
    that.tickFtns.forEach(function (ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.stop = function () {
  this.running = false;
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
  }
}

CountDownTimer.prototype.restart = function (duration) {
  this.stop();
  this.start(duration);
}

CountDownTimer.prototype.onTick = function (ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function () {
  return !this.running;
};

CountDownTimer.parse = function (seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};