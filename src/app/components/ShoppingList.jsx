"use client";
import React from "react";
import ShoppingListItem from "./ShoppingListItem";
import styles from "./ShoppingList.module.css";

export default function ShoppingList({ lists, onDeleteList, onAddItem, onRemoveItem, onToggleItem }) {
  return (
    <div className={styles.listsContainer}>
      {lists.map(list => (
        <div key={list.id} className={styles.listCard}>
          <h2>{list.name}</h2>
          <button onClick={() => onDeleteList(list.id)} className={styles.deleteListBtn}>Liste löschen</button>
          <ul>
            {list.items.map(item => (
              <ShoppingListItem
                key={item.id}
                item={item}
                onRemove={() => onRemoveItem(list.id, item.id)}
                onToggle={() => onToggleItem(list.id, item.id)}
              />
            ))}
          </ul>
          <form onSubmit={e => {
            e.preventDefault();
            const name = e.target.itemName.value;
            const quantity = Number(e.target.quantity.value) || 1;
            if (name) {
              onAddItem(list.id, name, quantity);
              e.target.reset();
            }
          }} className={styles.addItemForm}>
            <input name="itemName" placeholder="Neues Produkt" required className={styles.addItemInput} />
            <input name="quantity" type="number" min="1" defaultValue="1" className={styles.addItemInput} />
            <button type="submit" className={styles.addItemButton}>Hinzufügen</button>
          </form>
        </div>
      ))}
    </div>
  );
}
