import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id, // associate todo with loggedin user
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created Successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }); // fetch todos only for loggedin user.
    res.status(201).json({ message: "Todo Fetched Successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo fetching" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    // Find todo owned by the user
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    // Only update fields that are sent
    if (req.body.text !== undefined) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;

    const updatedTodo = await todo.save();
    res.status(200).json({ message: "Todo Updated Successfully", todo: updatedTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurring in todo updating" });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(201).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo Deletion" });
  }
};


