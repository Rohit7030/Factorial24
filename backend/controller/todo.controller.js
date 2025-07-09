import Todo from "../model/todo.model.js";

// Create Todo
export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    assignedBy: req.body.assignedBy || "",
    user: req.user._id,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created Successfully", newTodo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred in todo creation" });
  }
};

// Get Todo
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json({ message: "Todos Fetched Successfully", todos });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred in todo fetching" });
  }
};

//  Update Todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    if (req.body.text !== undefined) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;
    if (req.body.assignedBy !== undefined) todo.assignedBy = req.body.assignedBy;

    const updatedTodo = await todo.save();
    res.status(200).json({ message: "Todo Updated Successfully", todo: updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred in todo updating" });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred in todo deletion" });
  }
};
