import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          withCredentials: true,
        });
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;

    try {
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        {
          text: newTodo,
          completed: false,
          ...(assignedBy && { assignedBy }),
        },
        { withCredentials: true }
      );

      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
      setAssignedBy("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoUpdate = async () => {
    if (!newTodo || !editingTodoId) return;

    try {
      const response = await axios.put(
        `http://localhost:4001/todo/update/${editingTodoId}`,
        {
          text: newTodo,
          ...(assignedBy && { assignedBy }),
        },
        { withCredentials: true }
      );

      const updated = response.data.todo;
      setTodos(todos.map((t) => (t._id === editingTodoId ? updated : t)));
      setNewTodo("");
      setAssignedBy("");
      setIsEditing(false);
      setEditingTodoId(null);
    } catch (error) {
      setError("Failed to update todo");
    }
  };

  const todoEdit = (id) => {
    const todoToEdit = todos.find((t) => t._id === id);
    setNewTodo(todoToEdit.text);
    setAssignedBy(todoToEdit.assignedBy || "");
    setEditingTodoId(id);
    setIsEditing(true);
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        { withCredentials: true }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to update todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4001/user/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="my-10 bg-gray-300 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center p-6">TaskFlow</h1>

      <div className="flex flex-col sm:flex-row mb-4 gap-2">
        <input
          type="text"
          placeholder="Todo text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && (isEditing ? todoUpdate() : todoCreate())
          }
          className="flex-grow p-2 border rounded-md focus:outline-blue-500"
        />
        <input
          type="text"
          placeholder="Assigned by"
          value={assignedBy}
          onChange={(e) => setAssignedBy(e.target.value)}
          className="flex-grow p-2 border rounded-md focus:outline-blue-500"
        />
        <button
          onClick={isEditing ? todoUpdate : todoCreate}
          className={`${
            isEditing
              ? "bg-yellow-600 hover:bg-yellow-800"
              : "bg-blue-600 hover:bg-blue-900"
          } border rounded-md text-white px-4 py-2 duration-300`}
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {[...todos].reverse().map((todo) => (
            <li
              key={todo._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-md"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                />
                <div>
                  <p
                    className={`text-md ${
                      todo.completed
                        ? "line-through text-gray-600"
                        : "font-semibold"
                    }`}
                  >
                    {todo.text}
                  </p>
                  {todo.assignedBy && (
                    <p className="text-sm text-gray-500">
                      Assigned by: {todo.assignedBy}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-2 sm:mt-0">
                <button
                  onClick={() => todoEdit(todo._id)}
                  className="text-green-500 hover:text-green-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => todoDelete(todo._id)}
                  className="text-red-500 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingTodos} remaining todos
      </p>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
