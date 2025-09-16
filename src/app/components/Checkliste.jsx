import React from 'react';
import styles from './Checkliste.module.css';

const Checkliste = ({ items, onToggleItem, onRemoveItem }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className={styles.checklist}>
      {items.map((item, idx) => (
        <div className={styles.checklistRow} key={item.id || idx}>
          <input
            type="checkbox"
            id={`check-${item.id || idx}`}
            checked={item.completed}
            onChange={() => onToggleItem(item.id)}
            className={styles.customCheckbox}
          />
          <label 
            htmlFor={`check-${item.id || idx}`} 
            className={`${styles.checklistLabel} ${item.completed ? styles.checkedLabel : ''}`}
          >
            {item.name}
          </label>
          <span className={styles.checklistQuantity}>
            Menge: {item.quantity}
          </span>
          <button 
            className={styles.checklistRemove} 
            onClick={() => onRemoveItem(item.id)}
          >
            Entfernen
          </button>
        </div>
      ))}
    </div>
  );
}

export default Checkliste;
