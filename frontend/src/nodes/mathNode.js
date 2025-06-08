import { createNodeType } from '../basenode';

export const MathNode = createNodeType({
  title: 'Math Operation',
  fields: [
    {
      type: 'select',
      name: 'operation',
      label: 'Operation',
      options: [
        { value: 'add', label: 'Add (+)' },
        { value: 'subtract', label: 'Subtract (-)' },
        { value: 'multiply', label: 'Multiply (×)' },
        { value: 'divide', label: 'Divide (÷)' },
        { value: 'power', label: 'Power (^)' }
      ]
    }
  ],
  handles: {
    inputs: [
      { id: 'a', color: '#3b82f6', position: '20px' },
      { id: 'b', color: '#3b82f6', position: '45px' }
    ],
    outputs: [{ id: 'result', color: '#10b981' }]
  },
  style: {
    backgroundColor: '#f0f9ff',
    borderColor: '#3b82f6'
  },
  minWidth: 180,
  minHeight: 100
});