var assert = chai.assert;
var expect = chai.expect;

describe('workoutSequence - mixing blocks, sets, separate exercises', function () {
    const oneBlockOneExerciseAndPause = [{
        block: 'block 1',
        set: [{
            exercise: "exercise 1",
            duration: 30
        }]
    }, {
        exercise: "break", duration: 10
    }];
    describe('One block, one exercise and a pause', function () {
        var seq = new WorkoutSequence(oneBlockOneExerciseAndPause);
        it('should be "exercise 1" for current', function () {
            assert.equal(seq.current().exercise, 'exercise 1');
            assert.equal(seq.current().block, 'block 1');
            assert.equal(seq.current().duration, 30);
        });
        it('should should be break for next', function () {
            assert.equal(seq.next().exercise, 'break');
            assert.equal(seq.next().duration, 10);
            assert.equal(seq.next().block, '');
        });
    });
});
