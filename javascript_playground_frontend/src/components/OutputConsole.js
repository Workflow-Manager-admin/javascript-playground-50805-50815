import React from 'react';
import './OutputConsole.css';

// PUBLIC_INTERFACE
function OutputConsole({ output }) {
  const getOutputIcon = (type) => {
    switch (type) {
      case 'error': return '❌';
      case 'warn': return '⚠️';
      case 'result': return '📤';
      default: return '📝';
    }
  };

  const getOutputClass = (type) => {
    return `output-line output-${type}`;
  };

  return (
    <div className="output-console">
      <div className="console-header">
        <span className="console-title">Output</span>
        <span className="console-info">{output.length} {output.length === 1 ? 'line' : 'lines'}</span>
      </div>
      
      <div className="console-content">
        {output.length === 0 ? (
          <div className="console-empty">
            <span className="empty-icon">💻</span>
            <p>Run your code to see the output here</p>
          </div>
        ) : (
          output.map((item, index) => (
            <div key={index} className={getOutputClass(item.type)}>
              <span className="output-icon">{getOutputIcon(item.type)}</span>
              <span className="output-content">{item.content}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OutputConsole;
