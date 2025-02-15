import { ListProps } from "../common/types/ListProps";
import { TodoItem } from "../common/types/TodoItem";

const List = ({ title, listItems, onItemClick, disabled }: ListProps) => {
  const bgToggle = title ? "shadow-md border border-gray-100 rounded-lg" : "";
  return (
    <div className={`sm:w-1/4 w-full h-auto sm:h-full ${bgToggle}`}>
      {title ? (
        <h2 className="text-center text-lg bg-gray-200 font-bold p-2">
          {title}
        </h2>
      ) : (
        ""
      )}

      <div className="p-4">
        {listItems.map((item: TodoItem) => (
          <button
            key={item.name}
            className="w-full p-2 mb-2 text-black shadow-sm border border-gray-300 rounded-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => onItemClick(item)}
            disabled={disabled}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
