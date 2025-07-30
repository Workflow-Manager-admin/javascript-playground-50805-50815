import React, { useState, useEffect } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import OutputConsole from './components/OutputConsole';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// PUBLIC_INTERFACE
function App() {
  const [code, setCode] = useState('// Welcome to JavaScript Playground!\nconsole.log("Hello, World!");\n\n// Try some JavaScript code here\nconst greeting = "Welcome!";\nconsole.log(greeting);');
  const [output, setOutput] = useState([]);
  const [sharedSnippets, setSharedSnippets] = useState([
    {
      id: 1,
      title: 'Hello World',
      code: 'console.log("Hello, World!");',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Array Methods',
      code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);',
      createdAt: new Date().toISOString()
    }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // PUBLIC_INTERFACE
  const executeCode = () => {
    // Clear previous output
    setOutput([]);
    
    // Capture console output
    const originalConsole = { ...console };
    const capturedOutput = [];
    
    // Override console methods
    console.log = (...args) => {
      capturedOutput.push({ type: 'log', content: args.join(' ') });
      originalConsole.log(...args);
    };
    
    console.error = (...args) => {
      capturedOutput.push({ type: 'error', content: args.join(' ') });
      originalConsole.error(...args);
    };
    
    console.warn = (...args) => {
      capturedOutput.push({ type: 'warn', content: args.join(' ') });
      originalConsole.warn(...args);
    };

    try {
      // Execute the code
      const func = new Function(code);
      const result = func();
      
      // If there's a return value, add it to output
      if (result !== undefined) {
        capturedOutput.push({ type: 'result', content: String(result) });
      }
      
      setOutput(capturedOutput);
    } catch (error) {
      capturedOutput.push({ type: 'error', content: error.message });
      setOutput(capturedOutput);
    } finally {
      // Restore original console
      Object.assign(console, originalConsole);
    }
  };

  // PUBLIC_INTERFACE
  const shareSnippet = () => {
    const title = prompt('Enter a title for your snippet:');
    if (title && code.trim()) {
      const newSnippet = {
        id: Date.now(),
        title,
        code,
        createdAt: new Date().toISOString()
      };
      setSharedSnippets(prev => [newSnippet, ...prev]);
    }
  };

  // PUBLIC_INTERFACE
  const loadSnippet = (snippet) => {
    setCode(snippet.code);
    setSidebarOpen(false);
  };

  // PUBLIC_INTERFACE
  const clearCode = () => {
    setCode('');
    setOutput([]);
  };

  // Execute code when Enter is pressed with Ctrl/Cmd
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        executeCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code]);

  return (
    <div className="App">
      <Header 
        onExecute={executeCode}
        onShare={shareSnippet}
        onClear={clearCode}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="app-content">
        <main className="main-content">
          <div className="editor-section">
            <CodeEditor 
              code={code}
              onChange={setCode}
            />
          </div>
          
          <div className="output-section">
            <OutputConsole output={output} />
          </div>
        </main>
        
        <Sidebar 
          isOpen={sidebarOpen}
          snippets={sharedSnippets}
          onLoadSnippet={loadSnippet}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
