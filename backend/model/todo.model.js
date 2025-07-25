import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // refer user model
    required: true,
  },
  assignedBy: {
  type: String,
  default: "",
},

});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
