"use client";

import { MapTodos } from "@/components/MapTodos";
import { TodoInputWithButton } from "@/components/TodoInputWithButton";
import { createTodo, getTodos } from "@/services/api";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  taskName: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  async function handleTodoAdd(todo: string) {
    setIsCreating(true);
    const response = await createTodo({ taskName: todo.trim() });
    if (response?.statusCode === 201) {
      setTodo((prev) => [...prev, response.response]);
    }
    setIsCreating(false);
  }

  function toggleTodoCompleted(id: string, completed: boolean) {
    setTodo((prev) => {
      return prev.map((todo) => {
        return todo._id === id ? { ...todo, completed: !completed } : todo;
      });
    });
  }

  useEffect(() => {
    const getAllTodos = async () => {
      setIsFetching(true);
      const response = await getTodos();

      if (response) {
        setTodo(response.response);
      }
      setIsFetching(false);
    };

    getAllTodos();
  }, []);

  return (
    <div>
      <MapTodos
        handleChange={toggleTodoCompleted}
        data={todo}
        isLoading={isFetching}
      />
      <TodoInputWithButton
        onAdd={handleTodoAdd}
        buttonLabel={<CirclePlus />}
        isLoading={isCreating}
      />
    </div>
  );
}
