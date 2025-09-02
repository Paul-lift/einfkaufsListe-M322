"use client";
import React from "react";
import ShoppingListItem from "./ShoppingListItem";
import styles from "./ListDetail.module.css";

export default function ListDetail({ list, onAddItem, onRemoveItem, onToggleItem }) {
  if (!list) {
    return (
      <div className={styles.noSelection}>
        <h2>Wähle eine Einkaufsliste aus der Sidebar</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{list.name}</h1>
        <div className={styles.stats}>
          <span className={styles.totalItems}>{list.items.length} Items</span>
          <span className={styles.completedItems}>
            {list.items.filter(item => item.completed).length} erledigt
          </span>
        </div>
      </div>

      <form onSubmit={e => {
        e.preventDefault();
        const name = e.target.itemName.value;
        const quantity = Number(e.target.quantity.value) || 1;
        if (name) {
          onAddItem(list.id, name, quantity);
          e.target.reset();
        }
      }} className={styles.addItemForm}>
        <input 
          name="itemName" 
          placeholder="Neues Produkt" 
          required 
          className={styles.input} 
        />
        <input 
          name="quantity" 
          type="number" 
          min="1" 
          defaultValue="1" 
          className={styles.quantityInput} 
        />
        <button type="submit" className={styles.addButton}>Hinzufügen</button>
      </form>

      <div className={styles.itemList}>
        {list.items.length === 0 ? (
          <p className={styles.emptyMessage}>Noch keine Items in dieser Liste</p>
        ) : (
          <ul className={styles.items}>
            {list.items.map(item => (
              <ShoppingListItem
                key={item.id}
                item={item}
                onRemove={() => onRemoveItem(list.id, item.id)}
                onToggle={() => onToggleItem(list.id, item.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
