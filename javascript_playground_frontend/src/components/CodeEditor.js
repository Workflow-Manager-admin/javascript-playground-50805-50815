import React, { useEffect, useRef } from 'react';
import './CodeEditor.css';

// PUBLIC_INTERFACE
function CodeEditor({ code, onChange }) {
  const textareaRef = useRef(null);

  // Handle tab key for indentation
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Handle line numbers
  const getLineNumbers = () => {
    const lineCount = code.split('\n').length;
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span className="editor-title">Code Editor</span>
        <span className="editor-info">Press Ctrl+Enter to run</span>
      </div>
      
      <div className="editor-container">
        <div className="line-numbers">
          {getLineNumbers().map(num => (
            <div key={num} className="line-number">{num}</div>
          ))}
        </div>
        
        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your JavaScript code here..."
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
}

export default CodeEditor;
