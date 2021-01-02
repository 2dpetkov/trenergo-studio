var assert = chai.assert;
var expect = chai.expect;

describe('workoutSequence - default durations', function () {
    const oneBlockNoDefaultDuration = [{
        block: 'test block',
        set: [{
            exercise: 'test exercise 1',
            duration: 10,
        }, {
            exercise: 'test exercise 2',
            duration: 20,
        }]
    }];
    describe('One block, no default duration', function () {
        var seq = new WorkoutSequence(oneBlockNoDefaultDuration);
        it('should have custom durations', function () {
            assert.equal(seq.current().duration, 10);
            assert.equal(seq.next().duration, 20);
        });
    });

    const oneBlockDefaultDuration = [{
        block: 'test block',
        duration: 30,
        set: [{
            exercise: 'test exercise 1'
        }, {
            exercise: 'test exercise 2'
        }]
    }];
    describe('One block, with default duration', function () {
        var seq = new WorkoutSequence(oneBlockDefaultDuration);
        it('should have duration 30 for current', function () {
            assert.equal(seq.current().duration, 30);
        });
        it('should have duration 30 for next', function () {
            assert.equal(seq.next().duration, 30);
        });
    });

    const oneBlockCustomDurations = [{
        block: 'test block',
        duration: 30,
        set: [{
            exercise: 'test exercise 1',
            duration: 10
        }, {
            exercise: 'test exercise 2'
        }]
    }];
    describe('One block, with default duration and 1 custom durations', function () {
        var seq = new WorkoutSequence(oneBlockCustomDurations);
        it('should have duration 10 for current', function () {
            assert.equal(seq.current().duration, 10);
        });
        it('should have duration 30 for next', function () {
            assert.equal(seq.next().duration, 30);
        });
    });

    const oneBlockOnlyCustomDurations = [{
        block: 'test block',
        duration: 30,
        set: [{
            exercise: 'test exercise 1',
            duration: 10
        }, {
            exercise: 'test exercise 2',
            duration: 20
        }]
    }];
    describe('One block, with default duration, and 2 custom durations', function () {
        var seq = new WorkoutSequence(oneBlockOnlyCustomDurations);
        it('should have duration 10 for current', function () {
            assert.equal(seq.current().duration, 10);
        });
        it('should have duration 20 for next', function () {
            assert.equal(seq.next().duration, 20);
        });
    });
});