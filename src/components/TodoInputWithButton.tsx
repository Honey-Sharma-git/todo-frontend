"use client";

import { ChangeEvent, useRef, useState } from "react";

interface Props {
  onAdd: (value: string) => void;
  placeholder?: string;
  buttonLabel?: React.ReactNode | string;
  classNames?: { container?: string; input?: string; button?: string };
  isLoading: boolean;
}

export function TodoInputWithButton(props: Props) {
  const {
    onAdd,
    placeholder = "Enter your task here",
    buttonLabel = "Add",
    classNames,
    isLoading,
  } = props;

  const [todo, setTodo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const todo = e.target.value;
    setTodo(todo);
  }

  return (
    <div
      className={`flex flex-row gap-2 justify-center py-2 px-2 ${classNames?.container ?? ""}`}
    >
      <input
        ref={inputRef}
        type="text"
        className={`border px-4 rounded py-2 w-full ${classNames?.input ?? ""}`}
        placeholder={placeholder}
        value={todo}
        onChange={handleInputChange}
      />
      <button
        disabled={Boolean(!todo.trim())}
        className={`border px-4 rounded py-2  ${classNames?.button ?? ""} ${!todo.trim() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => {
          onAdd(todo);
          setTodo("");
          inputRef?.current?.focus();
        }}
      >
        {isLoading ? "Loading" : buttonLabel}
      </button>
    </div>
  );
}
