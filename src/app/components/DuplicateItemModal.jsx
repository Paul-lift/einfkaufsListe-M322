import React from 'react';
import styled from 'styled-components';

const DuplicateItemModal = ({ 
  isOpen, 
  itemName, 
  existingItem,
  onIncreaseQuantity, 
  onAddAnyway, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <StyledWrapper>
      <div className="modal-backdrop" onClick={onCancel}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Produkt bereits vorhanden</h3>
          </div>
          
          <div className="modal-body">
            <p>
              Das Produkt <strong>"{itemName}"</strong> ist bereits in der Liste vorhanden.
            </p>
            <div className="existing-item-info">
              <span>Aktuelle Menge: <strong>{existingItem.quantity}</strong></span>
            </div>
            <p>Was möchten Sie tun?</p>
          </div>

          <div className="modal-actions">
            <button 
              className="action-btn increase-btn"
              onClick={onIncreaseQuantity}
            >
              Menge um 1 erhöhen
            </button>
            <button 
              className="action-btn add-anyway-btn"
              onClick={onAddAnyway}
            >
              Trotzdem hinzufügen
            </button>
            <button 
              className="action-btn cancel-btn"
              onClick={onCancel}
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    max-width: 450px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-body p {
    margin: 0 0 1rem;
    color: #666;
    line-height: 1.5;
  }

  .existing-item-info {
    background: #f3f4f6;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    font-size: 0.9rem;
    color: #555;
  }

  .modal-actions {
    padding: 1rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .action-btn {
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .increase-btn {
    background: #10b981;
    color: white;
  }

  .increase-btn:hover {
    background: #059669;
  }

  .add-anyway-btn {
    background: #f59e0b;
    color: white;
  }

  .add-anyway-btn:hover {
    background: #d97706;
  }

  .cancel-btn {
    background: #e5e7eb;
    color: #374151;
  }

  .cancel-btn:hover {
    background: #d1d5db;
  }

  @media (min-width: 640px) {
    .modal-actions {
      flex-direction: row;
      justify-content: flex-end;
    }

    .action-btn {
      min-width: 120px;
    }
  }

  @media (prefers-color-scheme: dark) {
    .modal-content {
      background: #1f2937;
      border: 1px solid #374151;
    }

    .modal-header {
      border-bottom-color: #374151;
    }

    .modal-header h3 {
      color: #f3f4f6;
    }

    .modal-body p {
      color: #d1d5db;
    }

    .existing-item-info {
      background: #374151;
      color: #e5e7eb;
    }

    .cancel-btn {
      background: #374151;
      color: #d1d5db;
    }

    .cancel-btn:hover {
      background: #4b5563;
    }
  }
`;

export default DuplicateItemModal;
