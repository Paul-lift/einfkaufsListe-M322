"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ShoppingListForm from "./components/ShoppingListForm";
import Sidebar from "./components/Sidebar";
import ListDetail from "./components/ListDetail";
import DarkModeToggle from "./components/DarkModeToggle";
import Loader from "./components/loader";
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
  const [isLoading, setIsLoading] = useState(true);
  const selectedList = selectedListId ? getList(selectedListId) : null;

  useEffect(() => {
    // Mindestens 5 Sekunden Loading anzeigen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6767);

    return () => clearTimeout(timer);
  }, []);

  // Loader anzeigen, wenn noch geladen wird
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: 'var(--background-color, #111)'
      }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Einkaufslisten Manager</h1>
          <DarkModeToggle />
        </div>
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
