import React from 'react';
import styled from 'styled-components';

const Checkliste = ({ items, onToggleItem, onRemoveItem }) => {
  if (!items || items.length === 0) return null;
  return (
    <StyledWrapper>
      <div id="checklist">
        {items.map((item, idx) => (
          <div className="checklist-row" key={item.id || idx}>
            <input
              type="checkbox"
              id={`check-${item.id || idx}`}
              checked={item.completed}
              onChange={() => onToggleItem(item.id)}
            />
            <label htmlFor={`check-${item.id || idx}`} className={item.completed ? "checked-label" : ""}>{item.name}</label>
            <span className="checklist-quantity">Menge: {item.quantity}</span>
            <button className="checklist-remove" onClick={() => onRemoveItem(item.id)}>Entfernen</button>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #checklist {
    --background-light: #e3eaf3;
    --background-dark: #222e3c;
    --text-light: #414856;
    --text-dark: #fff;
    --check: #4f29f0;
    --disabled: #c3c8de;
    --border-radius: 10px;
    background: var(--background-light);
    color: var(--text-light);
    width: 100%;
    min-width: 300px;
    max-width: 1200px;
    min-height: 180px;
    border-radius: var(--border-radius);
    position: relative;
    box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;
    transition: background 0.3s, color 0.3s;
  }

  @media (prefers-color-scheme: dark) {
    #checklist {
      background: var(--background-dark);
      color: var(--text-dark);
    }
  }

  .checklist-row {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 0.5rem;
    background: transparent;
    padding: 0.5rem 0;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .checklist-row label {
    flex: 1;
    text-align: left;
    word-break: break-word;
    position: relative;
    transition: color 0.3s ease;
    margin-right: 20px;
    color: var(--text);
    cursor: pointer;
    display: grid;
    align-items: center;
    width: fit-content;
  }

  .checked-label {
    color: var(--disabled);
  }

  .checked-label::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    height: 2px;
    width: 100%;
    background: var(--disabled);
    border-radius: 2px;
    transform: translateY(-50%);
    z-index: 1;
  }

  @media (prefers-color-scheme: dark) {
    #checklist {
      background: var(--background-dark);
      color: var(--text-dark);
    }
  }

  .checklist-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
    background: transparent;
    padding: 0.2rem 0;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .checklist-row:last-child {
    margin-bottom: 0;
  }

  .checklist-quantity {
    font-size: 0.95rem;
    color: #888;
    margin-left: 1rem;
  }

  .checklist-remove {
    background: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    font-size: 0.95rem;
    margin-left: 1.5rem;
    transition: background 0.2s;
  }

  .checklist-remove:hover {
    background: #c82333;
  }

  /* ...bestehendes CSS für Checkbox und Animationen... */

  #checklist label {
    color: var(--text);
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: fit-content;
    transition: color 0.3s ease;
    margin-right: 20px;
  }

  #checklist label::before, #checklist label::after {
    content: "";
    position: absolute;
  }

  #checklist label::before {
    height: 2px;
    width: 8px;
    left: -27px;
    background: var(--check);
    border-radius: 2px;
    transition: background 0.3s ease;
  }

  #checklist label:after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
  }

  #checklist input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    outline: none;
    border: 0;
    margin: 0 15px 0 0;
    cursor: pointer;
    background: var(--background);
    display: grid;
    align-items: center;
    margin-right: 20px;
  }

  #checklist input[type="checkbox"]::before, #checklist input[type="checkbox"]::after {
    content: "";
    position: absolute;
    height: 2px;
    top: auto;
    background: var(--check);
    border-radius: 2px;
  }

  #checklist input[type="checkbox"]::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
  }

  #checklist input[type="checkbox"]::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
  }

  #checklist input[type="checkbox"]:checked::before {
    animation: check-01 0.4s ease forwards;
  }

  #checklist input[type="checkbox"]:checked::after {
    animation: check-02 0.4s ease forwards;
  }

  #checklist input[type="checkbox"]:checked + label {
    color: var(--disabled);
    animation: move 0.3s ease 0.1s forwards;
  }

  #checklist input[type="checkbox"]:checked + label::before {
    background: var(--disabled);
    animation: slice 0.4s ease forwards;
  }

  #checklist input[type="checkbox"]:checked + label::after {
    animation: firework 0.5s ease forwards 0.1s;
  }

  @keyframes move {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }

    100% {
      padding-right: 4px;
    }
  }

  @keyframes slice {
    60% {
      width: 100%;
      left: 4px;
    }

    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }

  @keyframes check-01 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }

    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }

    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }

    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }

  @keyframes check-02 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }

    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }

    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }

    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }

  @keyframes firework {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0;
    }

    30% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0, 14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0, -14px -8px 0 0px #4f29f0;
    }
  }`;

export default Checkliste;
