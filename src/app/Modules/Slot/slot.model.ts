import mongoose, { Schema } from "mongoose";
import { TSlot } from "./slot.interface";
import { Room } from "../Room/room.model";

const slotSchema = new Schema<TSlot>({
  room: { type: mongoose.Schema.ObjectId, required: true, ref: Room },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

export const Slot = mongoose.model("Slot", slotSchema);
