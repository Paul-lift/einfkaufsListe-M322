"use client";
import React, { useState } from "react";
import styles from "./ShoppingListForm.module.css";

export default function ShoppingListForm({ onCreate }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      setName("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Neue Liste"
        required
      />
      <button type="submit" className={styles.button}>Liste erstellen</button>
    </form>
  );
}
