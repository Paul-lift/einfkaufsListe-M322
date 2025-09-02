import { useState, useEffect, useRef } from "react";

export function useItems() {
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  // Lade Items beim ersten Rendern
  useEffect(() => {
    const data = localStorage.getItem("items");
    if (data) {
      setItems(JSON.parse(data));
    }
  }, []);

  // Speichere Items bei Änderung
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function addItem(name, quantity) {
    const newItem = { id: idRef.current++, name, quantity };
    setItems((prev) => [...prev, newItem]);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return { items, addItem, removeItem };
}
