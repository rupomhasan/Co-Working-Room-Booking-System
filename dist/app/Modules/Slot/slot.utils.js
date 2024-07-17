"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotFunction = void 0;
const convertMinutes = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
};
const formateTime = (minute) => {
    const hour = Math.floor(minute / 60)
        .toString()
        .padStart(2, "0");
    const mins = Math.floor(minute % 60)
        .toString()
        .padStart(2, "0");
    return `${hour}:${mins}`;
};
const slotFunction = (payload) => {
    const { startTime, endTime, room, date } = payload;
    let startMinute = convertMinutes(startTime);
    const endMinute = convertMinutes(endTime);
    const numberOfSlot = (endMinute - startMinute) / 60;
    const slots = [];
    let currentEnd = startMinute;
    for (let i = 0; i < Math.ceil(numberOfSlot); i++) {
        currentEnd += 60;
        slots.push({
            room,
            date,
            startTime: formateTime(startMinute),
            endTime: formateTime(currentEnd),
        });
        startMinute = currentEnd;
    }
    return slots;
};
exports.slotFunction = slotFunction;
