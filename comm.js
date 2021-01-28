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

module.exports = function (io) {
    io.on('connection', (socket) => {
        var userId = 'test123#user-id';

        socket.join(userId);
        console.log('socket added to room', userId);

        socket.on('disconnect', () => {
            console.log('socket exiting', userId);
        })

        socket.on('command', (cmd) => {
            console.log('command received:', cmd);
            socket.to(userId).emit('command', cmd);
        })
    });
};