"use client";

import { MapTodos } from "@/components/MapTodos";
import { TodoInputWithButton } from "@/components/TodoInputWithButton";
import { createTodo, deleteTodo, getTodos } from "@/services/api";
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

  async function handleDelete(id: string) {
    setIsFetching(true);
    const response = await deleteTodo(id);

    if (response?.statusCode === 200) {
      setTodo((prev) => {
        return prev.filter((todo) => todo._id !== id);
      });
    }
    setIsFetching(false);
  }

  useEffect(() => {
    const getAllTodos = async () => {
      setIsFetching(true);
      const response = await getTodos();

      if (response?.statusCode === 200) {
        setTodo(response.response);
      }
      setIsFetching(false);
    };

    getAllTodos();
  }, []);

  return (
    <div>
      <MapTodos
        onDelete={handleDelete}
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
