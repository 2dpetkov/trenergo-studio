function WorkoutSequencer(battery) {
    this.battery = battery || [];
    this.currentIdx = 0;
}

WorkoutSequencer.prototype.current = function () {
    return this.currentIdx >= this.battery.length ? null : this.battery[this.currentIdx];
}

WorkoutSequencer.prototype.next = function () {
    return this.currentIdx >= this.battery.length - 1 ? null : this.battery[this.currentIdx + 1];
}

WorkoutSequencer.prototype.iterate = function () {
    this.currentIdx++;
}