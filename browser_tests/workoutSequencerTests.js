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
        it('should return valud exercise, duration and empty block', function () {
            assert.equal(oneExerciseSeq.current().exercise, 'test exercise');
            assert.equal(oneExerciseSeq.current().block, '');
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
            assert.equal(threeExercisesSeq.current().block, '');
            assert.equal(threeExercisesSeq.next().exercise, 'test exercise 2');
            assert.equal(threeExercisesSeq.next().block, '');
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
        var seq = new WorkoutSequencer(oneExerciseZeroRepeats);
        it('should not run single exercise with zero repeats', function () {
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneExerciseOneRepeat = [{
        exercise: 'test exercise 1',
        duration: 10,
        repeat: 1
    }];
    describe('One exercise, one repeat', function () {
        var seq = new WorkoutSequencer(oneExerciseOneRepeat);
        it('should have one valid interval', function () {
            assert.equal(seq.current().exercise, 'test exercise 1');
            expect(seq.next()).to.be.null;
        });

        it('should have no more repeats', function () {
            seq.iterate();
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneExerciseThreeRepeats = [{
        exercise: 'test exercise 1',
        duration: 10,
        repeat: 3
    }];
    describe('One exercise, three repeats', function () {
        var seq = new WorkoutSequencer(oneExerciseThreeRepeats);
        it('should have current and next', function () {
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.next().exercise, 'test exercise 1');
        });

        it('should have current and next once again', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.next().exercise, 'test exercise 1');
        });

        it('should be at the last interval', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1');
            expect(seq.next()).to.be.null;
        });

        it('should have no more repeats', function () {
            seq.iterate();
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });

    const oneExerciseNegativeRepeats = [{
        exercise: 'test exercise 1',
        duration: 10,
        repeat: -1
    }];
    describe('One exercise, negative repeats', function () {
        var seq = new WorkoutSequencer(oneExerciseNegativeRepeats);
        it('should not run single exercise with negative repeats', function () {
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
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
        var seq = new WorkoutSequencer(threeExercisesTwoRepeats);
        it('should be between exercises 1 and 2', function () {
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 1');
            assert.equal(seq.next().exercise, 'test exercise 2');
        });

        it('should be between exercises 2 and 3', function () {
            seq.iterate();
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 2');
            assert.equal(seq.next().exercise, 'test exercise 3');
        });

        it('should be at the end of exercise 3', function () {
            seq.iterate();
            seq.iterate();
            assert.equal(seq.current().exercise, 'test exercise 3');
            expect(seq.next()).to.be.null;
        });

        it('should be finished', function () {
            seq.iterate();
            expect(seq.current()).to.be.null;
            expect(seq.next()).to.be.null;
        });
    });
});

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
    describe('One block, one exercises, two repeats', function () {
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
