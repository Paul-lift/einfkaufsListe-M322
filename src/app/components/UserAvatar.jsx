import React, { useState } from 'react';
import styled from 'styled-components';

const UserAvatar = ({ user, onAvatarClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
    if (onAvatarClick) {
      onAvatarClick();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    window.location.reload();
  };

  return (
    <StyledWrapper>
      <div className="avatar-container">
        <div 
          className="avatar" 
          style={{ backgroundColor: user.color }}
          onClick={handleClick}
          title={`${user.name} - Klicken für Optionen`}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        
        {showDropdown && (
          <div className="dropdown">
            <div className="dropdown-header">
              <div className="user-info">
                <div 
                  className="dropdown-avatar" 
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
              </div>
            </div>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>
              <span>Abmelden</span>
            </button>
          </div>
        )}
      </div>
      
      {showDropdown && (
        <div 
          className="backdrop" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .avatar-container {
    position: relative;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .avatar:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    z-index: 1000;
    overflow: hidden;
  }

  .dropdown-header {
    padding: 1rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .dropdown-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 0.875rem;
  }

  .user-name {
    font-weight: 500;
    color: #333;
  }

  .dropdown-divider {
    height: 1px;
    background: #e5e7eb;
  }

  .dropdown-item {
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s;
    color: #666;
  }

  .dropdown-item:hover {
    background: #f3f4f6;
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
  }

  @media (prefers-color-scheme: dark) {
    .dropdown {
      background: #1f2937;
      border: 1px solid #374151;
    }

    .user-name {
      color: #f3f4f6;
    }

    .dropdown-divider {
      background: #374151;
    }

    .dropdown-item {
      color: #d1d5db;
    }

    .dropdown-item:hover {
      background: #374151;
    }
  }
`;

export default UserAvatar;
