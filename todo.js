// App.jsx
import React from "react";
import TodoApp from "./components/TodoApp";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <TodoApp />
    </div>
  );
}

// components/TodoApp.jsx
import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Filter from "./Filter";

const FILTERS = {
  all: () => true,
  completed: (task) => task.completed,
  pending: (task) => !task.completed,
};

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <AddTodo onAdd={addTask} />
      <Filter current={filter} onChange={setFilter} />
      <TodoList
        tasks={tasks.filter(FILTERS[filter])}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

// components/AddTodo.jsx
import React, { useState } from "react";

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        className="flex-1 border border-gray-300 p-2 rounded-l"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}

// components/Filter.jsx
import React from "react";

export default function Filter({ current, onChange }) {
  const filters = ["all", "completed", "pending"];

  return (
    <div className="flex justify-around mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1 rounded-full border ${
            current === f ? "bg-blue-500 text-white" : "bg-white text-gray-600"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

// components/TodoList.jsx
import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) return <p className="text-center text-gray-500">No tasks</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

// components/TodoItem.jsx
import React from "react";

export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li
      className="flex justify-between items-center p-2 border-b hover:bg-gray-50"
    >
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        &times;
      </button>
    </li>
  );
}
