import React from 'react';
import './Sidebar.css';

// PUBLIC_INTERFACE
function Sidebar({ isOpen, snippets, onLoadSnippet, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const truncateCode = (code, maxLength = 100) => {
    if (code.length <= maxLength) return code;
    return code.substring(0, maxLength) + '...';
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            <span className="sidebar-icon">📋</span>
            Shared Snippets
          </h2>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="sidebar-content">
          {snippets.length === 0 ? (
            <div className="sidebar-empty">
              <span className="empty-icon">📝</span>
              <p>No snippets shared yet</p>
              <p className="empty-subtitle">Share your first snippet to see it here</p>
            </div>
          ) : (
            <div className="snippets-list">
              {snippets.map(snippet => (
                <div 
                  key={snippet.id} 
                  className="snippet-item"
                  onClick={() => onLoadSnippet(snippet)}
                >
                  <div className="snippet-header">
                    <h3 className="snippet-title">{snippet.title}</h3>
                    <span className="snippet-date">{formatDate(snippet.createdAt)}</span>
                  </div>
                  <div className="snippet-preview">
                    <code>{truncateCode(snippet.code)}</code>
                  </div>
                  <div className="snippet-actions">
                    <span className="snippet-load-hint">Click to load</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
