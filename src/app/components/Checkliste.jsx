import React from 'react';
import styles from './Checkliste.module.css';

const Checkliste = ({ items, onToggleItem, onRemoveItem, getCategoryInfo }) => {
  if (!items || items.length === 0) return null;

  // Gruppiere Items nach Kategorien
  const itemsByCategory = {};
  items.forEach(item => {
    const categoryId = item.category || 'other';
    if (!itemsByCategory[categoryId]) {
      itemsByCategory[categoryId] = [];
    }
    itemsByCategory[categoryId].push(item);
  });
  
  return (
    <div className={styles.checklist}>
      {Object.entries(itemsByCategory).map(([categoryId, categoryItems]) => {
        const categoryInfo = getCategoryInfo(categoryId);
        return (
          <div key={categoryId} className={styles.categorySection}>
            <h3 className={styles.categoryHeader}>
              {categoryInfo.name}
              <span className={styles.categoryCount}>({categoryItems.length})</span>
            </h3>
            <div className={styles.categoryItems}>
              {categoryItems.map((item, idx) => (
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
          </div>
        );
      })}
    </div>
  );
}

export default Checkliste;
