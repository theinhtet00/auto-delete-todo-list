import { TodoItem } from "./TodoItem";

export interface ListProps {
  title?: string;
  listItems: TodoItem[];
  onItemClick: (item: TodoItem) => void;
  disabled: boolean;
}
