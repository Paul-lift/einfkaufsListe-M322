"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ShoppingListForm from "./components/ShoppingListForm";
import Sidebar from "./components/Sidebar";
import ListDetail from "./components/ListDetail";
import DarkModeToggle from "./components/DarkModeToggle";
import Loader from "./components/loader";
import UserSetup from "./components/UserSetup";
import UserAvatar from "./components/UserAvatar";
import { useShoppingLists } from "./lib/shoppingList";

export default function Page() {
  const {
    lists,
    createList,
    deleteList,
    addItem,
    checkDuplicateItem,
    increaseItemQuantity,
    removeItem,
    toggleItem,
    getList
  } = useShoppingLists();

  const [selectedListId, setSelectedListId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const selectedList = selectedListId ? getList(selectedListId) : null;

  useEffect(() => {
    // Prüfen ob Benutzer bereits eingerichtet ist
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Mindestens 5 Sekunden Loading anzeigen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleUserSetup = (userData) => {
    localStorage.setItem('userProfile', JSON.stringify(userData));
    setUser(userData);
  };

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

  // Benutzereinrichtung anzeigen, wenn noch kein Benutzer vorhanden
  if (!user) {
    return <UserSetup onUserSetup={handleUserSetup} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Einkaufslisten Manager</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <DarkModeToggle />
            <UserAvatar user={user} />
          </div>
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
          onCheckDuplicate={checkDuplicateItem}
          onIncreaseQuantity={increaseItemQuantity}
          onRemoveItem={removeItem}
          onToggleItem={toggleItem}
        />
      </div>
    </div>
  );
}
