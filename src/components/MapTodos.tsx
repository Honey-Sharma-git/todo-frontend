import { Star } from "lucide-react";

interface Props {
  handleChange: (id: string, completed: boolean) => void;
  data: { _id: string; completed: boolean; taskName: string }[];
  isLoading: boolean;
}

export function MapTodos(props: Props) {
  const { handleChange, data, isLoading } = props;

  if (isLoading)
    return (
      <div className="border grid place-content-center min-h-[calc(100dvh-4rem)]">
        Tasks Loading...
      </div>
    );
  if (data.length === 0)
    return (
      <div className="border grid place-content-center min-h-[calc(100dvh-4rem)]">
        No Tasks Found
      </div>
    );

  return (
    <div className="min-h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] overflow-auto">
      {data.map((todo) => {
        return (
          <div
            key={todo._id}
            className="border-b first:border-t flex flex-row justify-between items-center px-2"
          >
            <label
              className="flex flex-row gap-2 py-2 px-2 w-full cursor-pointer hover:bg-gray-200"
              htmlFor={todo._id}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo._id}
                onChange={() => handleChange(todo._id, todo.completed)}
              />
              <div className={`${todo.completed ? "line-through" : ""}`}>
                {todo.taskName}
              </div>
            </label>

            <button className="cursor-pointer">
              <Star size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
