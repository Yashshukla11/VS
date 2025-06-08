import { createNodeType } from '../basenode';
import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = (props) => {
  const [text, setText] = useState(props.data.text || '');
  const [variables, setVariables] = useState([]);

  // Extract variables from text ({{variableName}})
  useEffect(() => {
    const variableRegex = /\{\{(\s*\w+\s*)\}\}/g;
    const matches = [...text.matchAll(variableRegex)];
    const newVariables = matches.map(match => match[1].trim());
    setVariables([...new Set(newVariables)]); // Remove duplicates
  }, [text]);

  const handleTextChange = (value) => {
    setText(value);
    if (props.data.updateNodeField) {
      props.data.updateNodeField(props.id, 'text', value);
    }
  };

  // Calculate dynamic dimensions
  const lines = text.split('\n').length;
  const longestLine = Math.max(...text.split('\n').map(line => line.length));
  const width = Math.max(200, longestLine * 8 + 60);
  const height = Math.max(120, lines * 24 + 80);

  return (
    <div 
      className="text-node"
      style={{
        width,
        height,
        padding: '12px',
        border: props.selected ? '2px solid #4f46e5' : '1px solid #d1d5db',
        borderRadius: '8px',
        backgroundColor: '#fffbeb',
        position: 'relative',
        boxShadow: props.selected ? '0 4px 12px rgba(79, 70, 229, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Title */}
      <div style={{ 
        fontWeight: 'bold', 
        marginBottom: '8px',
        color: '#92400e',
        fontSize: '14px'
      }}>
        Text
      </div>

      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter your text here... Use {{variableName}} for variables"
        style={{
          width: '100%',
          height: height - 60,
          border: '1px solid #d97706',
          borderRadius: '4px',
          padding: '8px',
          fontSize: '13px',
          fontFamily: 'monospace',
          resize: 'none',
          backgroundColor: '#fefcf3'
        }}
        rows={Math.max(3, lines)}
      />

      {/* Variable Handles */}
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={variable}
          style={{
            top: `${30 + index * 20}px`,
            background: '#d97706',
            width: '8px',
            height: '8px'
          }}
        />
      ))}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: '#d97706'
        }}
      />

      {/* Variable Labels */}
      {variables.length > 0 && (
        <div style={{
          position: 'absolute',
          left: '-60px',
          top: '30px',
          fontSize: '10px',
          color: '#92400e'
        }}>
          {variables.map((variable, index) => (
            <div key={variable} style={{ marginBottom: '8px', textAlign: 'right' }}>
              {variable}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};