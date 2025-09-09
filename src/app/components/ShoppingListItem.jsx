"use client";
import React from "react";
import styles from "./ShoppingListItem.module.css";

export default function ShoppingListItem({ item, onRemove, onToggle }) {
  return (
        <li className={`${styles.item} ${item.completed ? styles.completed : ''}`}>
      <div className={styles.checkboxContainer}>
        <input 
          type="checkbox" 
          checked={item.completed} 
          onChange={onToggle}
          className={styles.checkbox}
          id={`item-${item.id}`}
        />
        <label htmlFor={`item-${item.id}`} className={styles.checkboxLabel}></label>
      </div>
      <span className={styles.itemContent}>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.quantity}>Menge: {item.quantity}</span>
      </span>
      <button onClick={onRemove} className={styles.removeBtn}>Entfernen</button>
    </li>
  );
}
