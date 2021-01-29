var assert = chai.assert;
var expect = chai.expect;

describe('countDownTimer', function () {
    describe('#parse', function () {
        it('should be zero', function () {
            var obj = CountDownTimer.parse(0);
            assert.equal(obj.minutes, 0);
            assert.equal(obj.seconds, 0);
        });

        it('should be less than a minute', function () {
            var obj = CountDownTimer.parse(59);
            assert.equal(obj.minutes, 0);
            assert.equal(obj.seconds, 59);
        });

        it('should be 1 minute', function () {
            var obj = CountDownTimer.parse(60);
            assert.equal(obj.minutes, 1);
            assert.equal(obj.seconds, 0);
        });

        it('should be 1 minute 1 second', function () {
            var obj = CountDownTimer.parse(61);
            assert.equal(obj.minutes, 1);
            assert.equal(obj.seconds, 1);
        });

        it('should be 2 minutes 1 second', function () {
            var obj = CountDownTimer.parse(121);
            assert.equal(obj.minutes, 2);
            assert.equal(obj.seconds, 1);
        });

        it('should be 2 minutes 59 second', function () {
            var obj = CountDownTimer.parse(179);
            assert.equal(obj.minutes, 2);
            assert.equal(obj.seconds, 59);
        });
    });

    describe('#start', function () {
        it('should have expired after 1.1 seconds', function (done) {
            var cdt = new CountDownTimer();
            cdt.start(1);
            setTimeout(() => {
                if (cdt.expired()) {
                    done();
                } else {
                    done('not yet expired');
                }
            }, 1100);
        });
        it('should not have expired after 0.9 seconds', function (done) {
            var cdt = new CountDownTimer();
            cdt.start(1);
            setTimeout(() => {
                if (!cdt.expired()) {
                    done();
                } else {
                    done('expired');
                }
            }, 900);
        });
    });

    describe('#onTick', function () {
        it('should tick immediately', function (done) {
            var cdt = new CountDownTimer();
            cdt.onTick(function (m, s) {
                if (s === 0) {
                    done();
                } else {
                    done('second tick');
                }
            })
            cdt.start(0);
        });

        it('should tick twice and expire within 1 second', function (done) {
            var cdt = new CountDownTimer();
            var tickCount = 0;
            cdt.onTick(function (m, s) {
                tickCount++;
                if (s === 0 && tickCount === 2 && cdt.expired()) {
                    done();
                }
            });
            cdt.start(1);
        });

        it('should tick 6 times and expire within 1 seconds', function (done) {
            var cdt = new CountDownTimer(200);
            var tickCount = 0;
            cdt.onTick(function (m, s) {
                tickCount++;
                if (s === 0 && tickCount === 6 && cdt.expired()) {
                    done();
                }
            });
            cdt.start(1);
        });

        it('should tick 12 times and expire within 1 second', function (done) {
            var cdt = new CountDownTimer(200);
            var tickCount = 0;
            cdt.onTick(function (m, s) {
                tickCount++;
            });
            cdt.onTick(function (m, s) {
                tickCount++;
            });
            cdt.start(1);

            setTimeout(() => {
                if (tickCount === 12) {
                    done();
                } else {
                    done('ticked ' + tickCount + ' times');
                }
            }, 1100);
        });
    });

    describe('#stop', function () {
        it('should not be running after 1.1 seconds', function (done) {
            var cdt = new CountDownTimer();
            cdt.start(3);

            setTimeout(() => {
                if (cdt.expired()) {
                    done('should still be running');
                }
            }, 900);

            setTimeout(() => {
                cdt.stop();
            }, 1000);

            setTimeout(() => {
                if (cdt.expired()) {
                    done();
                } else {
                    done('should have expired');
                }
            }, 1100);
        });
    });

    describe('#restart', function () {
        it('should have been restarted', function (done) {
            var cdt = new CountDownTimer();
            cdt.start(1);

            setTimeout(() => {
                cdt.stop();
            }, 400);

            setTimeout(() => {
                if (!cdt.expired()) {
                    done('timer should have been stopped');
                }
                cdt.restart(1);
            }, 500);

            setTimeout(() => {
                if (cdt.expired()) {
                    done('timer should have restarted');
                }
            }, 600);

            setTimeout(() => {
                if (cdt.expired()) {
                    done();
                } else {
                    done('timer should have expired');
                }
            }, 1600);
        });
    });
});
