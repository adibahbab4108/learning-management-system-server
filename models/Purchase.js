import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed"] },
  },
  { timestamps: true }
);
export const Purchase = mongoose.model("Purchase", purchaseSchema);
