"use client";
import React from "react";
import Checkliste from "./Checkliste";
import styles from "./ListDetail.module.css";
import WaveInput from "./WaveInput";

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
        <WaveInput
          name="itemName"
          label="Neues Produkt"
          required
        />
        <div className={styles.quantityAndAdd}>
          <input 
          name="quantity" 
          type="number" 
          min="1" 
          defaultValue="1" 
          className={styles.quantityInput} 
        />
        <button type="submit" className={styles.addButton}>Hinzufügen</button>
        </div>
      </form>

      <Checkliste 
        items={list.items} 
        onToggleItem={itemId => onToggleItem(list.id, itemId)}
        onRemoveItem={itemId => onRemoveItem(list.id, itemId)}
      />
    </div>
  );
}
