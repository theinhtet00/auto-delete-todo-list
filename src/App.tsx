import { useState, useTransition } from "react";
import { TodoItem } from "./common/types/TodoItem";
import { initialItems } from "./common/initialItems";
import List from "./components/List";

function App() {
  const [mainList, setMainList] = useState<TodoItem[]>(initialItems);
  const [fruitList, setFruitList] = useState<TodoItem[]>([]);
  const [vegetableList, setVegetableList] = useState<TodoItem[]>([]);
  const [isPending, startTransition] = useTransition();

  const moveItem = (item: TodoItem, targetList: "Fruit" | "Vegetable") => {
    startTransition(() => {
      // Update the lists based on the target
      const targetListSetter = targetList === "Fruit" ? setFruitList : setVegetableList;
      
      targetListSetter((prev) => [...prev, item]);

      // Remove item from the main list
      setMainList((prev) => prev.filter((i) => i.name !== item.name));

      // Move back after 5 seconds
      setTimeout(() => {
        setMainList((prev) => {
          if (!prev.find((i) => i.name === item.name)) {
            return [...prev, item];
          }
          return prev;
        });

        // Remove item from the list after moving it back
        targetListSetter((prev) => prev.filter((i) => i.name !== item.name));
      }, 5000);
    });
  };

  const returnToMainList = (item: TodoItem, listType: "Fruit" | "Vegetable") => {
    startTransition(() => {
      setMainList((prev) => {
        if (!prev.find((i) => i.name === item.name)) {
          return [...prev, item];
        }
        return prev;
      });

      if (listType === "Fruit") {
        setFruitList((prev) => prev.filter((i) => i.name !== item.name));
      } else {
        setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 w-full h-screen justify-center items-center">
      <List
        listItems={mainList}
        onItemClick={(item: TodoItem) => moveItem(item, item.type)}
        disabled={isPending}
      />

      <List
        title="Fruit"
        listItems={fruitList}
        onItemClick={(item: TodoItem) => returnToMainList(item, "Fruit")}
        disabled={isPending}
      />

      <List
        title="Vegetable"
        listItems={vegetableList}
        onItemClick={(item: TodoItem) => returnToMainList(item, "Vegetable")}
        disabled={isPending}
      />
    </div>
  );
}

export default App;
