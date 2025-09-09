"use client";
import React, { useState } from "react";
import styles from "./ShoppingListForm.module.css";
import WaveInput from "./WaveInput";

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
      <WaveInput
        value={name}
        onChange={e => setName(e.target.value)}
        label="Neue Liste"
        required
      />
      <button type="submit" className={styles.button}>Liste erstellen</button>
    </form>
  );
}
