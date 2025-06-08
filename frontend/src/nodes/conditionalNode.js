import { createNodeType } from '../basenode';

export const ConditionalNode = createNodeType({
  title: 'Conditional Logic',
  fields: [
    {
      type: 'textarea',
      name: 'condition',
      label: 'Condition (JavaScript)',
      placeholder: 'input > 5\ninput.includes("hello")\ninput !== null'
    }
  ],
  handles: {
    inputs: [{ id: 'input', color: '#ec4899' }],
    outputs: [
      { id: 'true', color: '#10b981', position: '40px' },
      { id: 'false', color: '#ef4444', position: '65px' }
    ]
  },
  style: {
    backgroundColor: '#fdf2f8',
    borderColor: '#ec4899'
  },
  minWidth: 200,
  minHeight: 140,
  resizable: true
});