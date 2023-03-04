import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const BugSchema = Schema(
  {
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, min: 6, max: 255 },
    due_date: { type: Date, required: true },
    project: { type: String, required: true, max: 100 },
    reporter: { type: String, required: true, max: 100 },
    fileUrl: { type: String, required: true, max: 100 },
  },
  { timestamps: true }
);

export default model("Bug", BugSchema);
