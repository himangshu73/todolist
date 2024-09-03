import mongoose from "mongoose";
import { Schema } from "mongoose";

const listSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
    {
      task: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        required: false,
      },
    },
  ],
});

export default mongoose.models.ToDoList ||
  mongoose.model("ToDoList", listSchema);
