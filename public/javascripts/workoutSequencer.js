/*
TRENERGO Studio
Copyright (C) 2021 Dimitar Petkov

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

function WorkoutSequencer(input) {
    this.sequence = [];
    this.currentIdx = 0;

    var processItem = function (output, item) {
        if (!item || typeof item === 'undefined') {
            return;
        }

        if (Array.isArray(item)) {
            var i;
            for (i = 0; i < item.length; i++) {
                processItem(output, item[i]);
            }
        } else if (typeof item.exercise !== 'undefined') {
            if (typeof item.parent === 'undefined') {
                item.parent = null;
            }

            item.block = item.parent && typeof item.parent.block !== 'undefined' ?
                item.parent.block :
                '';
            if (typeof item.duration === 'undefined') {
                item.duration = item.parent && typeof item.parent.duration !== 'undefined' ?
                    item.parent.duration :
                    0;
            }
            var repeat = typeof item.repeat !== 'undefined' ? item.repeat : 1;
            for (repeat; repeat > 0; repeat--) {
                output.push(item);
            }
        } else if (typeof item.block !== 'undefined') {
            var repeat = typeof item.repeat === 'undefined' ? 1 : item.repeat;
            if (typeof item.set === 'undefined') {
                repeat = 0;
            }
            for (repeat; repeat > 0; repeat--) {
                var i;
                for (i = 0; i < item.set.length; i++) {
                    item.set[i].parent = item;
                    processItem(output, item.set[i]);
                }
            }
        }
    }

    processItem(this.sequence, input);
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