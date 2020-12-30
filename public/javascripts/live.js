const defaultTimer = 30;
var timerLength = defaultTimer;

// Debug
const testBattery = [{
    exercise: 'BURPEE',
    duration: 3,
    repeat: 3
}, {
    exercise: 'KNEE PUSHUPS',
    duration: 2,
    repeat: 5
}, {
    exercise: 'SQUATS',
    duration: 4,
    repeat: 2
}];

// Debug
const max30CardioChallenge = [{
    block: "Warm-up",
    defaultDuration: 30,
    set: [{
        exercise: "Chest Open Jack"
    }, {
        exercise: "Jack Uppercut"
    }, {
        exercise: "1-2-3 Knee"
    }, {
        exercise: "High knee Cross jab"
    }],
    repeat: 2
}, {
    block: "Block 1",
    defaultDuration: 30,
    set: [{
        exercise: "Squat kick R/L/Alt"
    }, {
        exercise: "Pike-up Spider R/L/Alt"
    }, {
        exercise: "10 & 2"
    }],
    repeat: 3
}, {
    block: "Block 2",
    defaultDuration: 30,
    set: [{
        exercise: "Med ball twist"
    }, {
        exercise: "Plank jack - in&out"
    }, {
        exercise: "4 Jab - 4 High knees"
    }],
    repeat: 3
}, {
    block: "Block 3",
    defaultDuration: 30,
    set: [{
        exercise: "Plyo power knee R/L/Alt"
    }, {
        exercise: "Scissor stance Jack"
    }, {
        exercise: "Shoulder tap - in&out"
    }],
    repeat: 3
}, {
    block: "Block 4",
    defaultDuration: 30,
    set: [{
        exercise: "Slap back Jack"
    }, {
        exercise: "1-2-3 Suicide burpee"
    }, {
        exercise: "Plank speed tap R/L/Alt"
    }],
    repeat: 3
}, {
    block: "Block 5",
    defaultDuration: 30,
    set: [{
        exercise: "Chair Squat"
    }, {
        exercise: "Football run"
    }, {
        exercise: "2 Jabs - 2 Tuck"
    }],
    repeat: 3
}];

const countdownZero = '--:--';

var sequencer;
var cdt;

window.onload = function () {
    sequencer = new WorkoutSequencer(max30CardioChallenge);
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