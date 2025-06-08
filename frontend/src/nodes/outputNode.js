import { createNodeType } from '../basenode';

export const OutputNode = createNodeType({
  title: 'Output',
  fields: [
    {
      type: 'text',
      name: 'outputName',
      label: 'Output Name',
      placeholder: 'Enter output name...'
    }
  ],
  handles: {
    inputs: [{ id: 'input', color: '#ef4444' }],
    outputs: []
  },
  style: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444'
  }
});