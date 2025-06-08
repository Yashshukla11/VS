import { createNodeType } from '../basenode';

export const FilterNode = createNodeType({
  title: 'Filter',
  fields: [
    {
      type: 'select',
      name: 'condition',
      label: 'Condition',
      options: [
        { value: 'equals', label: 'Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'greater_than', label: 'Greater Than' },
        { value: 'less_than', label: 'Less Than' },
        { value: 'not_empty', label: 'Not Empty' }
      ]
    },
    {
      type: 'text',
      name: 'value',
      label: 'Compare Value',
      placeholder: 'Enter comparison value...'
    }
  ],
  handles: {
    inputs: [{ id: 'input', color: '#6366f1' }],
    outputs: [
      { id: 'passed', color: '#10b981', position: '30px' },
      { id: 'failed', color: '#ef4444', position: '55px' }
    ]
  },
  style: {
    backgroundColor: '#f8fafc',
    borderColor: '#6366f1'
  },
  minWidth: 200,
  minHeight: 120
});