import { useState, useEffect } from "react";

export function useShoppingLists() {
  const [lists, setLists] = useState([]);

  // Lade Listen beim ersten Rendern
  useEffect(() => {
    const savedLists = localStorage.getItem("shoppingLists");
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);

  // Speichere Listen bei Änderung
  useEffect(() => {
    localStorage.setItem("shoppingLists", JSON.stringify(lists));
  }, [lists]);

  // Liste erstellen
  function createList(name) {
    const newList = {
      id: Date.now(), // Einfache ID-Generierung
      name: name,
      items: []
    };
    setLists(prev => [...prev, newList]);
    return newList;
  }

  // Liste löschen
  function deleteList(listId) {
    setLists(prev => prev.filter(list => list.id !== listId));
  }

  // Item zu Liste hinzufügen
  function addItem(listId, itemName, quantity = 1) {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        const newItem = {
          id: Date.now() + Math.random(), // Eindeutige ID
          name: itemName,
          quantity: quantity,
          completed: false
        };
        return { ...list, items: [...list.items, newItem] };
      }
      return list;
    }));
  }

  // Item aus Liste entfernen
  function removeItem(listId, itemId) {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return { ...list, items: list.items.filter(item => item.id !== itemId) };
      }
      return list;
    }));
  }

  // Item als erledigt markieren
  function toggleItem(listId, itemId) {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return list;
    }));
  }

  // Liste by ID finden
  function getList(listId) {
    return lists.find(list => list.id === listId);
  }

  return {
    lists,
    createList,
    deleteList,
    addItem,
    removeItem,
    toggleItem,
    getList
  };
}
