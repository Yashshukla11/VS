import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export const BaseNode = ({ 
  id, 
  data, 
  selected,
  config = {} 
}) => {
  const {
    title = 'Node',
    fields = [],
    handles = { inputs: [], outputs: [] },
    style = {},
    className = '',
    minWidth = 200,
    minHeight = 80,
    resizable = false,
    customContent = null
  } = config;

  const [nodeData, setNodeData] = useState(data || {});
  const [dimensions, setDimensions] = useState({ width: minWidth, height: minHeight });

  // Handle field updates
  const handleFieldChange = (fieldName, value) => {
    const newData = { ...nodeData, [fieldName]: value };
    setNodeData(newData);
    
    // If there's an update function in the store, call it
    if (data.updateNodeField) {
      data.updateNodeField(id, fieldName, value);
    }
  };

  // Auto-resize functionality for text areas
  useEffect(() => {
    if (resizable) {
      const textField = fields.find(field => field.type === 'textarea');
      if (textField && nodeData[textField.name]) {
        const text = nodeData[textField.name];
        const lines = text.split('\n').length;
        const longestLine = Math.max(...text.split('\n').map(line => line.length));
        
        const newHeight = Math.max(minHeight, 60 + lines * 20);
        const newWidth = Math.max(minWidth, longestLine * 8 + 40);
        
        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [nodeData, fields, resizable, minHeight, minWidth]);

  // Render field based on type
  const renderField = (field) => {
    const { type, name, label, placeholder, options = [] } = field;
    const value = nodeData[name] || '';

    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            placeholder={placeholder}
            className="node-input"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            placeholder={placeholder}
            className="node-textarea"
            rows={Math.max(2, value.split('\n').length)}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            className="node-select"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(name, parseFloat(e.target.value))}
            placeholder={placeholder}
            className="node-input"
          />
        );
      
      default:
        return null;
    }
  };

  // Render handles
  const renderHandles = () => {
    return (
      <>
        {handles.inputs.map((handle, index) => (
          <Handle
            key={`input-${index}`}
            type="target"
            position={Position.Left}
            id={handle.id}
            style={{ 
              top: handle.position || `${20 + index * 25}px`,
              background: handle.color || '#555'
            }}
          />
        ))}
        {handles.outputs.map((handle, index) => (
          <Handle
            key={`output-${index}`}
            type="source"
            position={Position.Right}
            id={handle.id}
            style={{ 
              top: handle.position || `${20 + index * 25}px`,
              background: handle.color || '#555'
            }}
          />
        ))}
      </>
    );
  };

  const nodeStyle = {
    width: dimensions.width,
    height: dimensions.height,
    padding: '10px',
    border: selected ? '2px solid #4f46e5' : '1px solid #cbd5e1',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: selected ? '0 4px 12px rgba(79, 70, 229, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    ...style
  };

  return (
    <div className={`base-node ${className}`} style={nodeStyle}>
      {/* Node Title */}
      <div className="node-header" style={{ 
        fontWeight: 'bold', 
        marginBottom: '8px',
        color: '#1f2937',
        fontSize: '14px'
      }}>
        {title}
      </div>

      {/* Custom Content (if provided) */}
      {customContent && (
        <div className="node-custom-content">
          {customContent(nodeData, handleFieldChange)}
        </div>
      )}

      {/* Fields */}
      <div className="node-fields">
        {fields.map((field) => (
          <div key={field.name} className="node-field" style={{ marginBottom: '8px' }}>
            {field.label && (
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                {field.label}
              </label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>

      {/* Handles */}
      {renderHandles()}
    </div>
  );
};

// Higher-order component for creating specific node types
export const createNodeType = (config) => {
  return (props) => <BaseNode {...props} config={config} />;
};