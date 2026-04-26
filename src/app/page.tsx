"use client";

import { MapTodos } from "@/components/MapTodos";
import { TodoInputWithButton } from "@/components/TodoInputWithButton";
import { createTodo } from "@/services/api";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState([
    {
      _id: "69ecc39368fd05bee222bee8",
      taskName: "second task",
      completed: false,
      createdAt: "2026-04-25T13:37:23.227Z",
      updatedAt: "2026-04-25T13:37:23.227Z",
    },
    {
      _id: "69ecc3dd68fd05bee222bee9",
      taskName: "3rd task",
      completed: false,
      createdAt: "2026-04-25T13:38:37.417Z",
      updatedAt: "2026-04-25T13:38:37.417Z",
    },
    {
      _id: "69edae1e334cc2347e76c2c8",
      taskName: "Vansh Sharma",
      completed: true,
      createdAt: "2026-04-26T06:18:06.398Z",
      updatedAt: "2026-04-26T06:18:06.398Z",
    },
    {
      _id: "69edb697d2ea1375b2d34dde",
      taskName: "Honey Sharma",
      completed: false,
      createdAt: "2026-04-26T06:54:15.855Z",
      updatedAt: "2026-04-26T06:54:15.855Z",
    },
    {
      _id: "69edc9db06b9115538354260",
      taskName: "Honey Sharma",
      completed: false,
      createdAt: "2026-04-26T08:16:27.589Z",
      updatedAt: "2026-04-26T08:16:27.589Z",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  async function handleTodoAdd(todo: string) {
    setIsLoading(true);
    const response = await createTodo({ taskName: todo.trim() });
    if (response?.statusCode === 201) {
      console.log(response.message);
      setTodo((prev) => [...prev, response.response]);
    }
    setIsLoading(false);
  }

  function toggleTodoCompleted(id: string, completed: boolean) {
    setTodo((prev) => {
      return prev.map((todo) => {
        return todo._id === id ? { ...todo, completed: !completed } : todo;
      });
    });
  }

  return (
    <div>
      <MapTodos handleChange={toggleTodoCompleted} data={todo} />
      <TodoInputWithButton
        onAdd={handleTodoAdd}
        buttonLabel={<CirclePlus />}
        isLoading={isLoading}
      />
    </div>
  );
}
