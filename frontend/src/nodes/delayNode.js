import { createNodeType } from '../basenode';

export const DelayNode = createNodeType({
  title: 'Delay',
  fields: [
    {
      type: 'number',
      name: 'duration',
      label: 'Duration (seconds)',
      placeholder: '1'
    },
    {
      type: 'select',
      name: 'unit',
      label: 'Time Unit',
      options: [
        { value: 'seconds', label: 'Seconds' },
        { value: 'minutes', label: 'Minutes' },
        { value: 'hours', label: 'Hours' }
      ]
    }
  ],
  handles: {
    inputs: [{ id: 'trigger', color: '#f59e0b' }],
    outputs: [{ id: 'delayed', color: '#f59e0b' }]
  },
  style: {
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b'
  },
  minWidth: 170
});