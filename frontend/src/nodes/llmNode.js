import { createNodeType } from '../basenode';

export const LLMNode = createNodeType({
  title: 'LLM',
  fields: [
    {
      type: 'select',
      name: 'model',
      label: 'Model',
      options: [
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
        { value: 'claude-3', label: 'Claude-3' }
      ]
    },
    {
      type: 'number',
      name: 'temperature',
      label: 'Temperature',
      placeholder: '0.7'
    },
    {
      type: 'number',
      name: 'maxTokens',
      label: 'Max Tokens',
      placeholder: '2048'
    }
  ],
  handles: {
    inputs: [
      { id: 'system', color: '#8b5cf6' },
      { id: 'prompt', color: '#3b82f6' }
    ],
    outputs: [{ id: 'response', color: '#10b981' }]
  },
  style: {
    backgroundColor: '#faf5ff',
    borderColor: '#8b5cf6'
  }
});
