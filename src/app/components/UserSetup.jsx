import React, { useState } from 'react';
import styled from 'styled-components';

const UserSetup = ({ onUserSetup }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6366f1');

  const colors = [
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#f59e0b', // Amber
    '#10b981', // Emerald
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#f97316', // Orange
    '#84cc16', // Lime
    '#06b6d4'  // Cyan
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onUserSetup({ name: name.trim(), color: selectedColor });
    }
  };

  return (
    <StyledWrapper>
      <div className="setup-container">
        <div className="setup-card">
          <h2>Willkommen!</h2>
          <p>Bitte geben Sie Ihren Namen ein und wählen Sie eine Farbe für Ihren Avatar:</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ihr Name"
                required
              />
            </div>

            <div className="color-group">
              <label>Avatar-Farbe:</label>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="preview">
              <span>Vorschau:</span>
              <div className="avatar-preview" style={{ backgroundColor: selectedColor }}>
                {name ? name.charAt(0).toUpperCase() : '?'}
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={!name.trim()}>
              Weiter
            </button>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .setup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
  }

  .setup-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  h2 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .input-group {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus {
    outline: none;
    border-color: #6366f1;
  }

  .color-group {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .color-options {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .color-option {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  .color-option:hover {
    transform: scale(1.1);
  }

  .color-option.selected {
    border-color: #333;
    box-shadow: 0 0 0 2px white, 0 0 0 4px #333;
  }

  .preview {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .avatar-preview {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .submit-btn {
    width: 100%;
    background: #6366f1;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: #5856eb;
  }

  .submit-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    .setup-card {
      background: #1f2937;
      color: white;
    }

    h2 {
      color: white;
    }

    p {
      color: #d1d5db;
    }

    label {
      color: #f3f4f6;
    }

    input {
      background: #374151;
      border-color: #4b5563;
      color: white;
    }

    input:focus {
      border-color: #6366f1;
    }
  }
`;

export default UserSetup;
