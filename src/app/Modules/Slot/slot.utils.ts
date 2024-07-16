import { TSlot } from "./slot.interface";

const convertMinutes = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);

    return hour * 60 + minute;
};


const formateTime = (minute: number) => {
    const hour = Math.floor(minute / 60)
        .toString()
        .padStart(2, "0");
    const mins = Math.floor(minute % 60)
        .toString()
        .padStart(2, "0");

    return `${hour}:${mins}`;
};
export const slotFunction = (payload: TSlot) => {
    const { startTime, endTime, room, date } = payload;
    let startMinute = convertMinutes(startTime);
    const endMinute = convertMinutes(endTime);
    const numberOfSlot = (endMinute - startMinute) / 60;

    let slots = [];
    let currentEnd = startMinute;

    for (let i = 0; i < Math.ceil(numberOfSlot); i++) {
        currentEnd += 60;

        slots.push({
            room,
            date,
            startTime: formateTime(startMinute),
            endTime: formateTime(currentEnd),
        });
        startMinute = currentEnd
    }

    return slots;
};
