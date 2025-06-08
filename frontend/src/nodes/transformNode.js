import { createNodeType } from '../basenode';

export const TransformNode = createNodeType({
  title: 'Transform Data',
  fields: [
    {
      type: 'select',
      name: 'transformation',
      label: 'Transformation',
      options: [
        { value: 'uppercase', label: 'To Uppercase' },
        { value: 'lowercase', label: 'To Lowercase' },
        { value: 'trim', label: 'Trim Whitespace' },
        { value: 'reverse', label: 'Reverse String' },
        { value: 'length', label: 'Get Length' },
        { value: 'split', label: 'Split String' }
      ]
    },
    {
      type: 'text',
      name: 'parameter',
      label: 'Parameter (if needed)',
      placeholder: 'e.g., separator for split'
    }
  ],
  handles: {
    inputs: [{ id: 'input', color: '#8b5cf6' }],
    outputs: [{ id: 'output', color: '#8b5cf6' }]
  },
  style: {
    backgroundColor: '#faf5ff',
    borderColor: '#8b5cf6'
  },
  minWidth: 220
});

