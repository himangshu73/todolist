"use client";

import React, { useState } from "react";

const Todolist = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };
  return (
    <div>
      <h1 className="font-extrabold">ToDo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="bg-white border p-2 mt-2"
        />
        <button type="submit" className="bg-blue-500 p-2 ml-2 rounded-sm">
          Add Task
        </button>
      </form>
      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li key={index} className="border-b p-2">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
