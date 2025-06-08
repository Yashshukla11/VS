import { createNodeType } from '../basenode';

export const InputNode = createNodeType({
  title: 'Input',
  fields: [
    {
      type: 'text',
      name: 'inputName',
      label: 'Input Name',
      placeholder: 'Enter input name...'
    },
    {
      type: 'select',
      name: 'inputType',
      label: 'Input Type',
      options: [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
        { value: 'file', label: 'File' }
      ]
    }
  ],
  handles: {
    inputs: [],
    outputs: [{ id: 'output', color: '#4ade80' }]
  },
  style: {
    backgroundColor: '#f0f9ff',
    borderColor: '#0ea5e9'
  }
});