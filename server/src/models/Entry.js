import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: String, required: true }, // YYYY-MM-DD (simple + consistent)
    title: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, default: "" }, // markdown text
    tags: { type: [String], default: [] },
    mood: { type: Number, min: 1, max: 5, default: 3 },
    links: { type: [String], default: [] },
    timeSpent: { type: Number, min: 0, default: 0 } // minutes
  },
  { timestamps: true }
);

entrySchema.index({ userId: 1, date: -1 });

export default mongoose.model("Entry", entrySchema);