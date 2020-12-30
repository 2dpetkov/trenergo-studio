var assert = chai.assert;
var expect = chai.expect;


describe('workoutSequencer', function () {
    const emptyBattery = [];
    const oneItemBattery = [{
        exercise: 'test exercise',
        duration: 5
    }];
    const twoItemBattery = [{
        exercise: 'test exercise 1',
        duration: 10
    }, {
        exercise: 'test exercise 2',
        duration: 7
    }];
    const threeItemBattery = [{
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

        var emptySeq = new WorkoutSequencer(emptyBattery);
        it('should return null on empty sequence', function () {
            expect(emptySeq.current()).to.be.null;
        });

        var oneItemSeq = new WorkoutSequencer(oneItemBattery);
        it('should return valud exercise and duration', function () {
            assert.equal(oneItemSeq.current().exercise, 'test exercise');
            assert.equal(oneItemSeq.current().duration, 5);

        });
    });

    describe('#next()', function () {
        var nullSeq = new WorkoutSequencer();
        it('should return null on null sequence', function () {
            expect(nullSeq.next()).to.be.null;
        });

        var emptySeq = new WorkoutSequencer(emptyBattery);
        it('should return null on empty sequence', function () {
            expect(emptySeq.next()).to.be.null;
        });

        var oneItemSeq = new WorkoutSequencer(oneItemBattery);
        it('should return null on one-item sequence', function () {
            expect(oneItemSeq.next()).to.be.null;
        });

        var twoItemSeq = new WorkoutSequencer(twoItemBattery);
        it('should return valid next', function () {
            assert.equal(twoItemSeq.next().exercise, 'test exercise 2')
            assert.equal(twoItemSeq.next().duration, 7);
        });
    });

    describe('#iterate()', function () {
        var threeItemSeq = new WorkoutSequencer(threeItemBattery);
        it('should be in the beginning of the sequence', function () {
            assert.equal(threeItemSeq.current().exercise, 'test exercise 1');
            assert.equal(threeItemSeq.next().exercise, 'test exercise 2');
            threeItemSeq.iterate();
        });

        it('should be in the middle of the sequence', function () {
            assert.equal(threeItemSeq.current().exercise, 'test exercise 2');
            assert.equal(threeItemSeq.next().exercise, 'test exercise 3');
            threeItemSeq.iterate();
        });

        it('should have gotten to the last element', function () {
            assert.equal(threeItemSeq.current().exercise, 'test exercise 3');
            expect(threeItemSeq.next()).to.be.null;
            threeItemSeq.iterate();
        });

        it('should return null when out of bound', function () {
            expect(threeItemSeq.current()).to.be.null;
            expect(threeItemSeq.next()).to.be.null;
            threeItemSeq.iterate();
        });

        it('should return null when further out of bound', function () {
            expect(threeItemSeq.current()).to.be.null;
            expect(threeItemSeq.next()).to.be.null;
            threeItemSeq.iterate();
        });
    });
});