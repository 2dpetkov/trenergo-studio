var assert = chai.assert;
var expect = chai.expect;

describe('workoutSequencer - blocks and repeats', function () {
    const oneBlockEmptySetNoRepeats = [{
        block: 'empty block',
        set: []
    }];
    describe('One block, no exercises, no repeats', function () {
        var seq = new WorkoutSequencer(oneBlockEmptySetNoRepeats);
        it('should be an empty set of exercises', function () {
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneBlockEmptySetTwoRepeats = [{
        block: 'empty block',
        set: [],
        repeat: 2
    }];
    describe('One block, no exercises, two repeats', function () {
        var seq = new WorkoutSequencer(oneBlockEmptySetTwoRepeats);
        it('should be an empty set of exercises', function () {
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneBlockTwoExercisesNoRepeats = [{
        block: 'test block',
        set: [{
            exercise: 'test exercise 1',
            duration: 10
        }, {
            exercise: 'test exercise 2',
            duration: 7
        }]
    }];
    describe('One block, two exercises, no repeats', function () {
        var seq = new WorkoutSequencer(oneBlockTwoExercisesNoRepeats);
        it('should have valid current and next', function () {
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.current().block, 'test block');
            assert.equal(seq.next().exercise, 'test exercise 2');
            assert.equal(seq.next().block, 'test block');
        });
    });

    const oneBlockTwoExercisesExRepeats = [{
        block: 'test block',
        set: [{
            exercise: 'test exercise 1',
            duration: 10,
            repeat: 3
        }, {
            exercise: 'test exercise 2',
            duration: 7,
            repeat: 2
        }]
    }];
    describe('One block, two exercises, no repeats', function () {
        var seq = new WorkoutSequencer(oneBlockTwoExercisesExRepeats);
        it('should have valid current and next', function () {
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.current().block, 'test block');
            assert.equal(seq.next().exercise, 'test exercise 1');
            assert.equal(seq.next().block, 'test block');
        });

        it('should have valid current and next', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.current().block, 'test block');
            assert.equal(seq.next().exercise, 'test exercise 1');
            assert.equal(seq.next().block, 'test block');
        });

        it('should be at the end of first set', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.current().block, 'test block');
            assert.equal(seq.next().exercise, 'test exercise 2');
            assert.equal(seq.next().block, 'test block');
        });

        it('should be at the beginning of second set', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2');
            assert.equal(seq.current().block, 'test block');
            assert.equal(seq.next().exercise, 'test exercise 2');
            assert.equal(seq.next().block, 'test block');
        });

        it('should be at the end of second set', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2');
            assert.equal(seq.current().block, 'test block');
            expect(seq.next()).to.be.null;
        });

        it('should be after sequence', function () {
            seq.iterate();
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneBlockOneExerciseZeroRepeats = [{
        block: 'test block',
        set: [{
            exercise: 'test exercise 1',
            duration: 10
        }], 
        repeat: 0
    }];
    describe('One block, one exercises, zero repeats', function () {
        var seq = new WorkoutSequencer(oneBlockOneExerciseZeroRepeats);
        it('should be an empty set of exercises', function () {
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneBlockOneExerciseNegativeRepeats = [{
        block: 'test block',
        set: [{
            exercise: 'test exercise 1',
            duration: 10
        }], 
        repeat: -2
    }];
    describe('One block, one exercises, negative repeats', function () {
        var seq = new WorkoutSequencer(oneBlockOneExerciseNegativeRepeats);
        it('should be an empty set of exercises', function () {
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneBlockOneExerciseOneRepeat = [{
        block: 'test block',
        set: [{
            exercise: 'test exercise 1',
            duration: 10
        }], 
        repeat: 1
    }];
    describe('One block, one exercises, one repeat', function () {
        var seq = new WorkoutSequencer(oneBlockOneExerciseOneRepeat);
        it('should be at the end of the sequence', function () {
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.current().block, 'test block');
            expect(seq.next()).to.be.null;
        });

        it('should be after sequence', function () {
            seq.iterate();
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneBlockOneExerciseTwoRepeats = [{
        block: 'test block',
        set: [{
            exercise: 'test exercise 1',
            duration: 10
        }], 
        repeat: 2
    }];
    describe('One block, one exercises, two repeats', function () {
        var seq = new WorkoutSequencer(oneBlockOneExerciseTwoRepeats);
        it('should have valid current and next', function () {
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.current().block, 'test block');
            assert.equal(seq.next().exercise, 'test exercise 1');
            assert.equal(seq.next().block, 'test block');
        });

        it('should be at the end of the sequence', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.current().block, 'test block');
            expect(seq.next()).to.be.null;
        });

        it('should be after sequence', function () {
            seq.iterate();
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const fullExerciseBattery = [{
        block: 'test block 1',
        set: [{
            exercise: 'test exercise 1-1',
            duration: 10,
            repeat: 2
        }, {
            exercise: 'test exercise 1-2',
            duration: 20,
            repeat: 2
        }], 
        repeat: 2
    }, {
        block: 'test block 2',
        set: [{
            exercise: 'test exercise 2-1',
            duration: 10,
            repeat: 2
        }, {
            exercise: 'test exercise 2-2',
            duration: 20,
            repeat: 2
        }],
        repeat: 2
    }];
    describe('Full exercise battery', function () {
        var seq = new WorkoutSequencer(fullExerciseBattery);
        it('should be on block 1, repeat 1/2, exercise 1-1, repeat 1/2', function () {
            assert.equal(seq.current().exercise, 'test exercise 1-1');
            assert.equal(seq.current().block, 'test block 1');
            assert.equal(seq.next().exercise, 'test exercise 1-1');
            assert.equal(seq.next().block, 'test block 1');
        });

        it('should be on block 1, repeat 1/2, exercise 1-1, repeat 2/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1-1');
            assert.equal(seq.current().block, 'test block 1');
            assert.equal(seq.next().exercise, 'test exercise 1-2');
            assert.equal(seq.next().block, 'test block 1');
        });

        it('should be on block 1, repeat 1/2, exercise 1-2, repeat 1/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1-2');
            assert.equal(seq.current().block, 'test block 1');
            assert.equal(seq.next().exercise, 'test exercise 1-2');
            assert.equal(seq.next().block, 'test block 1');
        });

        it('should be on block 1, repeat 1/2, exercise 1-2, repeat 2/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1-2');
            assert.equal(seq.current().block, 'test block 1');
            assert.equal(seq.next().exercise, 'test exercise 1-1');
            assert.equal(seq.next().block, 'test block 1');
        });

        it('should be on block 1, repeat 2/2, exercise 1-1, repeat 1/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1-1');
            assert.equal(seq.current().block, 'test block 1');
            assert.equal(seq.next().exercise, 'test exercise 1-1');
            assert.equal(seq.next().block, 'test block 1');
        });

        it('should be on block 1, repeat 2/2, exercise 1-1, repeat 2/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1-1');
            assert.equal(seq.current().block, 'test block 1');
            assert.equal(seq.next().exercise, 'test exercise 1-2');
            assert.equal(seq.next().block, 'test block 1');
        });

        it('should be on block 1, repeat 2/2, exercise 1-2, repeat 1/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1-2');
            assert.equal(seq.current().block, 'test block 1');
            assert.equal(seq.next().exercise, 'test exercise 1-2');
            assert.equal(seq.next().block, 'test block 1');
        });

        it('should be on block 1, repeat 2/2, exercise 1-2, repeat 2/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1-2');
            assert.equal(seq.current().block, 'test block 1');
            assert.equal(seq.next().exercise, 'test exercise 2-1');
            assert.equal(seq.next().block, 'test block 2');
        });

        it('should be on block 2, repeat 1/2, exercise 2-1, repeat 1/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2-1');
            assert.equal(seq.current().block, 'test block 2');
            assert.equal(seq.next().exercise, 'test exercise 2-1');
            assert.equal(seq.next().block, 'test block 2');
        });

        it('should be on block 2, repeat 1/2, exercise 2-1, repeat 2/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2-1');
            assert.equal(seq.current().block, 'test block 2');
            assert.equal(seq.next().exercise, 'test exercise 2-2');
            assert.equal(seq.next().block, 'test block 2');
        });

        it('should be on block 2, repeat 1/2, exercise 2-2, repeat 1/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2-2');
            assert.equal(seq.current().block, 'test block 2');
            assert.equal(seq.next().exercise, 'test exercise 2-2');
            assert.equal(seq.next().block, 'test block 2');
        });

        it('should be on block 2, repeat 1/2, exercise 2-2, repeat 2/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2-2');
            assert.equal(seq.current().block, 'test block 2');
            assert.equal(seq.next().exercise, 'test exercise 2-1');
            assert.equal(seq.next().block, 'test block 2');
        });

        it('should be on block 2, repeat 2/2, exercise 2-1, repeat 1/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2-1');
            assert.equal(seq.current().block, 'test block 2');
            assert.equal(seq.next().exercise, 'test exercise 2-1');
            assert.equal(seq.next().block, 'test block 2');
        });

        it('should be on block 2, repeat 2/2, exercise 2-1, repeat 2/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2-1');
            assert.equal(seq.current().block, 'test block 2');
            assert.equal(seq.next().exercise, 'test exercise 2-2');
            assert.equal(seq.next().block, 'test block 2');
        });

        it('should be on block 2, repeat 2/2, exercise 2-2, repeat 1/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2-2');
            assert.equal(seq.current().block, 'test block 2');
            assert.equal(seq.next().exercise, 'test exercise 2-2');
            assert.equal(seq.next().block, 'test block 2');
        });

        it('should be on block 2, repeat 2/2, exercise 2-2, repeat 2/2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2-2');
            assert.equal(seq.current().block, 'test block 2');
            expect(seq.next()).to.be.null;
        });

        it('should be after sequence', function () {
            seq.iterate();
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });
});
