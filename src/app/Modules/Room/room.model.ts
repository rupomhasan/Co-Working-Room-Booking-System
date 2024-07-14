import mongoose, { Schema } from 'mongoose';
import TRoom from './room.interface';
const roomSchema = new Schema<TRoom>({
    name: { type: String, required: true },
    roomNo: { type: Number, require: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: {
        type: Number, require: true
    },
    amenities: [{ type: String, required: true }],
    isDeleted: { type: Boolean, default: false }
})


export const Room = mongoose.model("Room", roomSchema);