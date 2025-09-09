"use client";
import React from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ lists, selectedListId, onSelectList, onDeleteList }) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Einkaufslisten</h2>
      <div className={styles.listContainer}>
        {lists.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <p className={styles.emptyText}>Noch keine Listen erstellt</p>
            <p className={styles.emptySubtext}>Erstelle deine erste Einkaufsliste oben</p>
          </div>
        ) : (
          lists.map(list => (
            <div 
              key={list.id} 
              className={`${styles.listItem} ${selectedListId === list.id ? styles.active : ''}`}
              onClick={() => onSelectList(list.id)}
            >
              <span className={styles.listName}>{list.name}</span>
              <span className={styles.itemCount}>({list.items.length})</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteList(list.id);
                }} 
                className={styles.deleteBtn}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
