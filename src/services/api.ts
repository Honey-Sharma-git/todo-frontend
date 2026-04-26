const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

interface TodoResponse {
  statusCode: number;
  message: string;
  response: {
    taskName: string;
    completed: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function createTodo(payload: {
  taskName: string;
}): Promise<TodoResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await response?.json();
    return json;
  } catch (error) {
    console.error("Failed to create todo", error);
    return null;
  }
}

interface GetTodosResponse {
  statusCode: number;
  message: string;
  response: {
    _id: string;
    taskName: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}

export async function getTodos(): Promise<GetTodosResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/todo`, {
      method: "GET",
    });

    const json = await response?.json();
    return json;
  } catch (error) {
    console.error("Failed to create todo", error);
    return null;
  }
}

interface DeleteResponse {
  statusCode: number;
  message: string;
}

export async function deleteTodo(id: string): Promise<DeleteResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/todo/${id}`, {
      method: "DELETE",
    });

    const json = await response?.json();
    return json;
  } catch (error) {
    console.error("Failed to create todo", error);
    return null;
  }
}

export async function toggleTodoComplete(
  payload: {
    completed: boolean;
  },
  id: string,
): Promise<TodoResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/todo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await response?.json();
    return json;
  } catch (error) {
    console.error("Failed to create todo", error);
    return null;
  }
}
