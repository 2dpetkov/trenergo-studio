/*
TRENERGO Studio
Copyright (C) 2021 Dimitar Petkov

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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