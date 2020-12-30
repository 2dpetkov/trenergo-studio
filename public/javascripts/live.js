const defaultTimer = 30;
var timerLength = defaultTimer;

// Debug
const testBattery = [{
    exercise: 'BURPEE',
    duration: 5
}, {
    exercise: 'KNEE PUSHUPS',
    duration: 7
}, {
    exercise: 'SQUATS',
    duration: 4
}];

const countdownZero = '--:--';

var sequencer;
var cdt;

window.onload = function () {
    sequencer = new WorkoutSequencer(testBattery);
    cdt = new CountDownTimer();

    updateSequenceDiv(sequencer.current(), sequencer.next());
    
    var obj = CountDownTimer.parse(sequencer.current().duration);
    var display = document.querySelector('#countdown-number');
    display.textContent = `${('0' + obj.minutes).substr(-2)}:${('0' + obj.seconds).substr(-2)}`;

    cdt.onTick(function (m, s) {
        if (!cdt.expired()) {
            display.textContent = `${('0' + m).substr(-2)}:${('0' + s).substr(-2)}`;
        } else {
            var currentInterval = sequencer.current();
            var nextInterval = sequencer.next();

            if (!currentInterval) {
                display.textContent = countdownZero;
                document.querySelector('#countdown-circle-fg').style.animation = '';
            } else {
                resetCircleAnimation(currentInterval.duration);
                updateSequenceDiv(currentInterval, nextInterval);

                cdt.restart(currentInterval.duration);
            }

            sequencer.iterate();
        }
    });
}

function updateSequenceDiv(now, next) {
    document.getElementById('sequence-value-now').innerHTML = now.exercise;
    document.getElementById('sequence-value-next').innerHTML = next ? next.exercise : '&nbsp;';
}

function resetCircleAnimation(seconds) {
    var countdownCircleEl = document.querySelector('#countdown-circle-fg');
    var clone = countdownCircleEl.cloneNode(true);
    countdownCircleEl.parentNode.replaceChild(clone, countdownCircleEl);
    clone.style.animation = 'countdown ' + seconds + 's linear infinite forwards';
}

// Debug
function testButtonGo() {
    cdt.start();
}