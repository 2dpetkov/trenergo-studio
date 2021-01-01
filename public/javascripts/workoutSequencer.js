function WorkoutSequencer(input) {
    this.sequence = [];
    this.currentIdx = 0;
    this.currentBlock = "";

    //TODO: use one recursive method to process any type of input element
    // probably asynchronously? And yield a promise?

    var processSet = function (output, blockName, set, defaultDuration) {
        var i, len = (!set || typeof set.length === 'undefined') ? 0 : set.length;
        for (i = 0; i < len; i++) {
            var r;
            for (r = typeof set[i].repeat === 'undefined' ? 1 : set[i].repeat; r > 0; r--) {
                var exercise = set[i];
                if (typeof exercise.duration === 'undefined') {
                    exercise.duration = defaultDuration ? defaultDuration : null;
                }
                if (typeof exercise.exercise !== 'undefined' && exercise.duration !== null) {
                    exercise.block = blockName;
                    output.push(exercise);
                }
            }
        }
    }

    var processBlock = function (output, block) {
        var r;
        for (r = typeof block.repeat === 'undefined' ? 1 : block.repeat; r > 0; r--) {
            processSet(output, block.block, block.set, block.defaultDuration);
        }
    }

    var i, len = (!input || typeof input.length === 'undefined') ? 0 : input.length;
    for (i = 0; i < len; i++) {
        processBlock(this.sequence, input[i]);
    }

    processSet(this.sequence, this.currentBlock, input);
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