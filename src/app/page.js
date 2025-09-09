"use client";
import { useState } from "react";
import styles from "./page.module.css";
import ShoppingListForm from "./components/ShoppingListForm";
import Sidebar from "./components/Sidebar";
import ListDetail from "./components/ListDetail";
import { useShoppingLists } from "./lib/shoppingList";

export default function Page() {
  const {
    lists,
    createList,
    deleteList,
    addItem,
    removeItem,
    toggleItem,
    getList
  } = useShoppingLists();

  const [selectedListId, setSelectedListId] = useState(null);
  const selectedList = selectedListId ? getList(selectedListId) : null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Einkaufslisten Manager</h1>
        <ShoppingListForm onCreate={(name) => {
          const newList = createList(name);
          setSelectedListId(newList.id);
        }} />
      </div>
      <div className={styles.content}>
        <Sidebar 
          lists={lists}
          selectedListId={selectedListId}
          onSelectList={setSelectedListId}
          onDeleteList={(listId) => {
            deleteList(listId);
            if (selectedListId === listId) {
              setSelectedListId(null);
            }
          }}
        />
        <ListDetail
          list={selectedList}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onToggleItem={toggleItem}
        />
      </div>
    </div>
  );
}
