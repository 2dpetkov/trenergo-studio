function WorkoutSequencer(input) {
    this.sequence = [];
    this.currentIdx = 0;

    var processSet = function (sequence, set) {
        var i, len = (!set || typeof set.length === 'undefined') ? 0 : set.length;
        for (i = 0; i < len; i++) {
            var r;
            for (r = typeof set[i].repeat === 'undefined' ? 1 : set[i].repeat; r > 0; r--) {
                var exercise = set[i];
                if (typeof exercise.exercise !== 'undefined' && typeof exercise.duration !== 'undefined') {
                    sequence.push(exercise);
                }
            }
        }
    }

    processSet(this.sequence, input);
}

WorkoutSequencer.prototype.current = function () {
    return this.currentIdx >= this.sequence.length ? null : this.sequence[this.currentIdx];
}

WorkoutSequencer.prototype.next = function () {
    return this.currentIdx >= this.sequence.length - 1 ? null : this.sequence[this.currentIdx + 1];
}

WorkoutSequencer.prototype.iterate = function () {
    this.currentIdx++;
}