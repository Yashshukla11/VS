// import { createNodeType } from '../basenode';
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = (props) => {
  const [text, setText] = useState(props.data.text || '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const nodeRef = useRef(null);
  const [nodeHeight, setNodeHeight] = useState(0);

  useEffect(() => {
    const variableRegex = /\{\{\s*([^}]+?)\s*\}\}/g;
    const matches = [...text.matchAll(variableRegex)];
    const newVariables = matches.map(match => match[1].trim());
    setVariables([...new Set(newVariables)]); // Remove duplicates
  }, [text]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  useEffect(() => {
    if (nodeRef.current) {
      setNodeHeight(nodeRef.current.offsetHeight);
    }
  }, [text, variables]);

  const handleTextChange = (value) => {
    setText(value);
    if (props.data.updateNodeField) {
      props.data.updateNodeField(props.id, 'text', value);
    }
  };

  const width = 320;
  const padding = 12;
  const handleCount = variables.length;
  const availableHeight = nodeHeight - 2 * padding;

  return (
    <div 
      className="text-node"
      ref={nodeRef}
      style={{
        width,
        padding: '12px',
        border: props.selected ? '2px solid #4f46e5' : '1px solid #d1d5db',
        borderRadius: '8px',
        backgroundColor: '#fffbeb',
        position: 'relative',
        boxShadow: props.selected ? '0 4px 12px rgba(79, 70, 229, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ 
        fontWeight: 'bold', 
        marginBottom: '8px',
        color: '#92400e',
        fontSize: '14px'
      }}>
        Text
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter your text here... Use {{variableName}} for variables"
        style={{
          width: '100%',
          minHeight: '120px',
          border: '1px solid #d97706',
          borderRadius: '4px',
          padding: '8px',
          fontSize: '13px',
          fontFamily: 'monospace',
          resize: 'none',
          backgroundColor: '#fefcf3',
          boxSizing: 'border-box',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        rows={3}
      />

      {variables.map((variable, index) => {
        let top = padding;
        if (handleCount > 1) {
          top = padding + ((index + 1) * availableHeight) / (handleCount + 1);
        } else if (handleCount === 1) {
          top = padding + availableHeight / 2;
        }
        return (
          <Handle
            key={`var-${variable}`}
            type="target"
            position={Position.Left}
            id={variable.replace(/\s+/g, '_')}
            style={{
              top: `${top}px`,
              background: '#d97706'
            }}
          />
        );
      })}

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: '#d97706'
        }}
      />

      {variables.length > 0 && (
        <div style={{
          position: 'absolute',
          left: '-28px',
          top: '0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontSize: '10px',
          color: '#92400e'
        }}>
          {variables.map((variable, index) => {
            let top = padding;
            if (handleCount > 1) {
              top = padding + ((index + 1) * availableHeight) / (handleCount + 1);
            } else if (handleCount === 1) {
              top = padding + availableHeight / 2;
            }
            return (
              <div key={variable} style={{ position: 'absolute', top: `${top - 8}px`, right: 0, width: '28px', textAlign: 'right' }}>
                {variable}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};