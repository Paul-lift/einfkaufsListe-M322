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

  // Verfügbare Kategorien
  const categories = [
    { id: 'fruits-vegetables', name: '🥬 Obst & Gemüse', order: 1 },
    { id: 'meat-fish', name: '🥩 Fleisch & Fisch', order: 2 },
    { id: 'dairy', name: '🥛 Milchprodukte', order: 3 },
    { id: 'bakery', name: '🍞 Bäckerei', order: 4 },
    { id: 'frozen', name: '❄️ Tiefkühl', order: 5 },
    { id: 'pantry', name: '🥫 Vorratskammer', order: 6 },
    { id: 'beverages', name: '🥤 Getränke', order: 7 },
    { id: 'snacks', name: '🍿 Snacks', order: 8 },
    { id: 'household', name: '🧽 Haushalt', order: 9 },
    { id: 'personal-care', name: '🧴 Körperpflege', order: 10 },
    { id: 'other', name: '📦 Sonstiges', order: 11 }
  ];

  // Item zu Liste hinzufügen
  function addItem(listId, itemName, quantity = 1, categoryId = 'other') {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        const newItem = {
          id: Date.now() + Math.random(), // Eindeutige ID
          name: itemName,
          quantity: quantity,
          completed: false,
          category: categoryId
        };
        return { ...list, items: [...list.items, newItem] };
      }
      return list;
    }));
  }

  // Prüfe ob Item bereits existiert
  function checkDuplicateItem(listId, itemName) {
    const list = getList(listId);
    if (!list) return null;
    
    return list.items.find(item => 
      item.name.toLowerCase().trim() === itemName.toLowerCase().trim()
    );
  }

  // Erhöhe Menge eines bestehenden Items
  function increaseItemQuantity(listId, itemId, increaseBy = 1) {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item =>
            item.id === itemId 
              ? { ...item, quantity: item.quantity + increaseBy }
              : item
          )
        };
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

  // Items nach Kategorien sortiert abrufen
  function getSortedItems(listId) {
    const list = getList(listId);
    if (!list) return [];

    // Gruppiere Items nach Kategorien
    const itemsByCategory = {};
    list.items.forEach(item => {
      const categoryId = item.category || 'other';
      if (!itemsByCategory[categoryId]) {
        itemsByCategory[categoryId] = [];
      }
      itemsByCategory[categoryId].push(item);
    });

    // Sortiere Kategorien und Items
    const sortedItems = [];
    categories
      .sort((a, b) => a.order - b.order)
      .forEach(category => {
        if (itemsByCategory[category.id]) {
          sortedItems.push(...itemsByCategory[category.id]);
        }
      });

    return sortedItems;
  }

  // Kategorie-Info abrufen
  function getCategoryInfo(categoryId) {
    return categories.find(cat => cat.id === categoryId) || categories.find(cat => cat.id === 'other');
  }

  return {
    lists,
    categories,
    createList,
    deleteList,
    addItem,
    checkDuplicateItem,
    increaseItemQuantity,
    removeItem,
    toggleItem,
    getList,
    getSortedItems,
    getCategoryInfo
  };
}
