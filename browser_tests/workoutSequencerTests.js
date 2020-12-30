var assert = chai.assert;
var expect = chai.expect;


describe('workoutSequencer - single level, no repeats', function () {
    const emptySet = [];
    const oneExercise = [{
        exercise: 'test exercise',
        duration: 5
    }];
    const twoExercises = [{
        exercise: 'test exercise 1',
        duration: 10
    }, {
        exercise: 'test exercise 2',
        duration: 7
    }];
    const threeExercises = [{
        exercise: 'test exercise 1',
        duration: 10
    }, {
        exercise: 'test exercise 2',
        duration: 20
    }, {
        exercise: 'test exercise 3',
        duration: 30
    }];

    describe('#current()', function () {
        var nullSeq = new WorkoutSequencer();
        it('should return null on null sequence', function () {
            expect(nullSeq.current()).to.be.null;
        });

        var emptySeq = new WorkoutSequencer(emptySet);
        it('should return null on empty sequence', function () {
            expect(emptySeq.current()).to.be.null;
        });

        var oneExerciseSeq = new WorkoutSequencer(oneExercise);
        it('should return valud exercise and duration', function () {
            assert.equal(oneExerciseSeq.current().exercise, 'test exercise');
            assert.equal(oneExerciseSeq.current().duration, 5);
        });
    });

    describe('#next()', function () {
        var nullSeq = new WorkoutSequencer();
        it('should return null on null sequence', function () {
            expect(nullSeq.next()).to.be.null;
        });

        var emptySeq = new WorkoutSequencer(emptySet);
        it('should return null on empty sequence', function () {
            expect(emptySeq.next()).to.be.null;
        });

        var oneExerciseSeq = new WorkoutSequencer(oneExercise);
        it('should return null on one-exercise sequence', function () {
            expect(oneExerciseSeq.next()).to.be.null;
        });

        var twoExercisesSeq = new WorkoutSequencer(twoExercises);
        it('should return valid next', function () {
            assert.equal(twoExercisesSeq.next().exercise, 'test exercise 2')
            assert.equal(twoExercisesSeq.next().duration, 7);
        });
    });

    describe('#iterate()', function () {
        var threeExercisesSeq = new WorkoutSequencer(threeExercises);
        it('should be at the beginning of the sequence', function () {
            assert.equal(threeExercisesSeq.current().exercise, 'test exercise 1');
            assert.equal(threeExercisesSeq.next().exercise, 'test exercise 2');
        });

        it('should be in the middle of the sequence', function () {
            threeExercisesSeq.iterate();
            assert.equal(threeExercisesSeq.current().exercise, 'test exercise 2');
            assert.equal(threeExercisesSeq.next().exercise, 'test exercise 3');
        });

        it('should have gotten to the last element', function () {
            threeExercisesSeq.iterate();
            assert.equal(threeExercisesSeq.current().exercise, 'test exercise 3');
            expect(threeExercisesSeq.next()).to.be.null;
        });

        it('should return null when out of bound', function () {
            threeExercisesSeq.iterate();
            expect(threeExercisesSeq.current()).to.be.null;
            expect(threeExercisesSeq.next()).to.be.null;
        });

        it('should return null when further out of bound', function () {
            threeExercisesSeq.iterate();
            expect(threeExercisesSeq.current()).to.be.null;
            expect(threeExercisesSeq.next()).to.be.null;
        });
    });
});

describe('workoutSequencer - single level, repeats', function () {
    const oneExerciseZeroRepeats = [{
        exercise: 'test exercise 1',
        duration: 10,
        repeat: 0
    }];
    describe('One exercise, zero repeats', function () {
        var oneExerciseZeroRepeatSeq = new WorkoutSequencer(oneExerciseZeroRepeats);
        it('should not run single exercise with zero repeats', function () {
            expect(oneExerciseZeroRepeatSeq.current()).to.be.null;
            expect(oneExerciseZeroRepeatSeq.next()).to.be.null;
        });
    });

    const oneExerciseOneRepeat = [{
        exercise: 'test exercise 1',
        duration: 10,
        repeat: 1
    }];
    describe('One exercise, one repeat', function () {
        var oneExerciseOneRepeatSeq = new WorkoutSequencer(oneExerciseOneRepeat);
        it('should have one valid interval', function () {
            assert.equal(oneExerciseOneRepeatSeq.current().exercise, 'test exercise 1');
            expect(oneExerciseOneRepeatSeq.next()).to.be.null;
        });

        it('should have no more repeats', function () {
            oneExerciseOneRepeatSeq.iterate();
            expect(oneExerciseOneRepeatSeq.current()).to.be.null;
            expect(oneExerciseOneRepeatSeq.next()).to.be.null;
        });
    });

    const oneExerciseThreeRepeats = [{
        exercise: 'test exercise 1',
        duration: 10,
        repeat: 3
    }];
    describe('One exercise, three repeats', function () {
        var oneExerciseThreeRepeatsSeq = new WorkoutSequencer(oneExerciseThreeRepeats);
        it('should have current and next', function () {
            assert.equal(oneExerciseThreeRepeatsSeq.current().exercise, 'test exercise 1');
            assert.equal(oneExerciseThreeRepeatsSeq.next().exercise, 'test exercise 1');
        });

        it('should have current and next once again', function () {
            oneExerciseThreeRepeatsSeq.iterate();
            assert.equal(oneExerciseThreeRepeatsSeq.current().exercise, 'test exercise 1');
            assert.equal(oneExerciseThreeRepeatsSeq.next().exercise, 'test exercise 1');
        });

        it('should be at the last interval', function () {
            oneExerciseThreeRepeatsSeq.iterate();
            assert.equal(oneExerciseThreeRepeatsSeq.current().exercise, 'test exercise 1');
            expect(oneExerciseThreeRepeatsSeq.next()).to.be.null;
        });

        it('should have no more repeats', function () {
            oneExerciseThreeRepeatsSeq.iterate();
            expect(oneExerciseThreeRepeatsSeq.current()).to.be.null;
            expect(oneExerciseThreeRepeatsSeq.next()).to.be.null;
        });
    });

    const oneExerciseNegativeRepeats = [{
        exercise: 'test exercise 1',
        duration: 10,
        repeat: -1
    }];
    describe('One exercise, negative repeats', function () {
        var oneExerciseNegativeRepeatsSeq = new WorkoutSequencer(oneExerciseNegativeRepeats);
        it('should not run single exercise with negative repeats', function () {
            expect(oneExerciseNegativeRepeatsSeq.current()).to.be.null;
            expect(oneExerciseNegativeRepeatsSeq.next()).to.be.null;
        });
    });

    const threeExercisesTwoRepeats = [{
        exercise: 'test exercise 1',
        duration: 10,
        repeat: 2
    }, {
        exercise: 'test exercise 2',
        duration: 20,
        repeat: 2
    }, {
        exercise: 'test exercise 3',
        duration: 30,
        repeat: 2
    }];
    describe('Three exercises, two repeats', function () {
        var threeExercisesTwoRepeatsSeq = new WorkoutSequencer(threeExercisesTwoRepeats);
        it('should be between exercises 1 and 2', function () {
            threeExercisesTwoRepeatsSeq.iterate();
            assert.equal(threeExercisesTwoRepeatsSeq.current().exercise, 'test exercise 1');
            assert.equal(threeExercisesTwoRepeatsSeq.next().exercise, 'test exercise 2');
        });

        it('should be between exercises 2 and 3', function () {
            threeExercisesTwoRepeatsSeq.iterate();
            threeExercisesTwoRepeatsSeq.iterate();
            assert.equal(threeExercisesTwoRepeatsSeq.current().exercise, 'test exercise 2');
            assert.equal(threeExercisesTwoRepeatsSeq.next().exercise, 'test exercise 3');
        });

        it('should be at the end of exercise 3', function () {
            threeExercisesTwoRepeatsSeq.iterate();
            threeExercisesTwoRepeatsSeq.iterate();
            assert.equal(threeExercisesTwoRepeatsSeq.current().exercise, 'test exercise 3');
            expect(threeExercisesTwoRepeatsSeq.next()).to.be.null;
        });

        it('should be finished', function () {
            threeExercisesTwoRepeatsSeq.iterate();
            expect(threeExercisesTwoRepeatsSeq.current()).to.be.null;
            expect(threeExercisesTwoRepeatsSeq.next()).to.be.null;
        });
    });
});

describe('workoutSequencer - blocks and repeats', function () {
    const oneBlockEmptySetNoRepeats = [{
        block: 'empty block',
        set: []
    }];
    describe('One block, no exercises, no repeats', function () {
        var oneBlockEmptySetNoRepeatsSeq = new WorkoutSequencer(oneBlockEmptySetNoRepeats);
        it('should be an empty set of exercises', function () {
            expect(oneBlockEmptySetNoRepeatsSeq.current()).to.be.null;
            expect(oneBlockEmptySetNoRepeatsSeq.next()).to.be.null;
        });
    });

    const oneBlockEmptySetTwoRepeats = [{
        block: 'empty block',
        set: [],
        repeat: 2
    }];
    describe('One block, no exercises, two repeats', function () {
        var oneBlockEmptySetTwoRepeatsSeq = new WorkoutSequencer(oneBlockEmptySetTwoRepeats);
        it('should be an empty set of exercises', function () {
            expect(oneBlockEmptySetTwoRepeatsSeq.current()).to.be.null;
            expect(oneBlockEmptySetTwoRepeatsSeq.next()).to.be.null;
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
        var oneBlockTwoExercisesNoRepeatsSeq = new WorkoutSequencer(oneBlockTwoExercisesNoRepeats);
        it('should have valid current and next', function () {
            assert.equal(oneBlockTwoExercisesNoRepeatsSeq.current().exercise, 'test exercise 1');
            assert.equal(oneBlockTwoExercisesNoRepeatsSeq.next().exercise, 'test exercise 2');
        });
    });
});
