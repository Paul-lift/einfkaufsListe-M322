"use client";
import React, { useState } from "react";
import Checkliste from "./Checkliste";
import DuplicateItemModal from "./DuplicateItemModal";
import styles from "./ListDetail.module.css";
import WaveInput from "./WaveInput";

export default function ListDetail({ 
  list, 
  categories,
  onAddItem, 
  onCheckDuplicate, 
  onIncreaseQuantity, 
  onRemoveItem, 
  onToggleItem,
  getSortedItems,
  getCategoryInfo
}) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    itemName: '',
    quantity: 1,
    category: 'other',
    existingItem: null
  });

  if (!list) {
    return (
      <div className={styles.noSelection}>
        <h2>Wähle eine Einkaufsliste aus der Sidebar</h2>
      </div>
    );
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.itemName.value.trim();
    const quantity = Number(e.target.quantity.value) || 1;
    const category = e.target.category.value || 'other';
    
    if (!name) return;

    // Prüfe auf Duplikat
    const existingItem = onCheckDuplicate(list.id, name);
    
    if (existingItem) {
      // Zeige Modal für Duplikat
      setModalState({
        isOpen: true,
        itemName: name,
        quantity: quantity,
        category: category,
        existingItem: existingItem
      });
    } else {
      // Füge Item direkt hinzu
      onAddItem(list.id, name, quantity, category);
      e.target.reset();
    }
  };

  const handleIncreaseQuantity = () => {
    onIncreaseQuantity(list.id, modalState.existingItem.id, modalState.quantity);
    setModalState({ isOpen: false, itemName: '', quantity: 1, category: 'other', existingItem: null });
  };

  const handleAddAnyway = () => {
    onAddItem(list.id, modalState.itemName, modalState.quantity, modalState.category);
    setModalState({ isOpen: false, itemName: '', quantity: 1, category: 'other', existingItem: null });
  };

  const handleCancel = () => {
    setModalState({ isOpen: false, itemName: '', quantity: 1, category: 'other', existingItem: null });
  };

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

      <form onSubmit={handleFormSubmit} className={styles.addItemForm}>
        <WaveInput
          name="itemName"
          label="Neues Produkt"
          required
        />
        <div className={styles.formRow}>
          <select name="category" className={styles.categorySelect} defaultValue="other">
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
        items={getSortedItems(list.id)} 
        onToggleItem={itemId => onToggleItem(list.id, itemId)}
        onRemoveItem={itemId => onRemoveItem(list.id, itemId)}
        getCategoryInfo={getCategoryInfo}
      />

      <DuplicateItemModal
        isOpen={modalState.isOpen}
        itemName={modalState.itemName}
        existingItem={modalState.existingItem}
        onIncreaseQuantity={handleIncreaseQuantity}
        onAddAnyway={handleAddAnyway}
        onCancel={handleCancel}
      />
    </div>
  );
}
