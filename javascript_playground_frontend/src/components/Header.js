import React from 'react';
import './Header.css';

// PUBLIC_INTERFACE
function Header({ onExecute, onShare, onClear, onToggleSidebar, sidebarOpen }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            <span className="js-icon">JS</span>
            JavaScript Playground
          </h1>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={onClear}
            title="Clear editor"
          >
            <span className="btn-icon">🗑️</span>
            Clear
          </button>
          
          <button 
            className="btn btn-accent"
            onClick={onShare}
            title="Share snippet"
          >
            <span className="btn-icon">📤</span>
            Share
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={onExecute}
            title="Run code (Ctrl+Enter)"
          >
            <span className="btn-icon">▶️</span>
            Run
          </button>
          
          <button 
            className={`btn btn-outline ${sidebarOpen ? 'active' : ''}`}
            onClick={onToggleSidebar}
            title="Toggle snippets sidebar"
          >
            <span className="btn-icon">📋</span>
            Snippets
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
