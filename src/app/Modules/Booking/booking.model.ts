import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  isConfirmed: { type: String, default: "unconfirmed" },
  totalAmount: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
});

export const Booking = mongoose.model("booking", bookingSchema);
