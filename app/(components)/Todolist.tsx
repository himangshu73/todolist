"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/authContext";
import axios from "axios";

interface Task {
  task: string;
  _id: string;
}

const Todolist = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const { isLoggedIn, userName, login, logout } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (isLoggedIn && userName) {
        try {
          const response = await axios.get(`api/duelist?userName=${userName}`);
          setTasks(response.data.tasks || []);
        } catch (error) {
          console.log("Failed to fetch tasks:", error);
        }
      }
    };

    fetchTasks();
  }, [isLoggedIn, userName]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("api/checkauth");
        const { isLoggedIn, userName } = response.data;
        if (isLoggedIn) {
          login(userName);
        }
        console.log(userName);
      } catch (error) {
        console.error("Failed to check authentication:", error);
      }
    };
    checkAuth();
  }, [login]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (task.trim()) {
      try {
        const response = await axios.post("api/todolist", { task, userName });
        const newTask: Task = {
          task,
          _id: response.data.taskId,
        };

        setTasks([...tasks, newTask]);
        setTask("");
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };
  return (
    <div>
      <h1 className="font-extrabold">{userName}'s ToDo List</h1>
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
        {tasks.map((taskItem) => (
          <li key={taskItem._id} className="border-b p-2">
            {taskItem.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
