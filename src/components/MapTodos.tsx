import { Star } from "lucide-react";

interface Props {
  handleChange: (id: string, completed: boolean) => void;
  data: { _id: string; completed: boolean; taskName: string }[];
}

export function MapTodos(props: Props) {
  const { handleChange, data } = props;

  return (
    <div>
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
