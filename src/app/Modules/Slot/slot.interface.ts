import mongoose from "mongoose"

export type TSlot = {
    room: mongoose.ObjectId,
    date: string,
    startTime: string,
    endTime: string,
    isBooked?: boolean
}