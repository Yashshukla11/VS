// toolbar.js - Updated with new nodes and styling
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const nodeCategories = [
        {
            title: 'Input/Output',
            nodes: [
                { type: 'customInput', label: 'Input', color: '#0ea5e9' },
                { type: 'customOutput', label: 'Output', color: '#ef4444' },
                { type: 'text', label: 'Text', color: '#d97706' }
            ]
        },
        {
            title: 'Processing',
            nodes: [
                { type: 'llm', label: 'LLM', color: '#8b5cf6' },
                { type: 'transform', label: 'Transform', color: '#8b5cf6' },
                { type: 'filter', label: 'Filter', color: '#6366f1' }
            ]
        },
        {
            title: 'Logic & Math',
            nodes: [
                { type: 'math', label: 'Math', color: '#3b82f6' },
                { type: 'conditional', label: 'Conditional', color: '#ec4899' },
                { type: 'delay', label: 'Delay', color: '#f59e0b' }
            ]
        }
    ];

    return (
        <div style={{ 
            padding: '20px', 
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0'
        }}>
            <h2 style={{ 
                margin: '0 0 20px 0', 
                color: '#1e293b',
                fontSize: '24px',
                fontWeight: '600'
            }}>
                Pipeline Builder
            </h2>
            
            {nodeCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} style={{ marginBottom: '24px' }}>
                    <h3 style={{ 
                        margin: '0 0 12px 0', 
                        color: '#475569',
                        fontSize: '16px',
                        fontWeight: '500'
                    }}>
                        {category.title}
                    </h3>
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '12px' 
                    }}>
                        {category.nodes.map((node) => (
                            <DraggableNode 
                                key={node.type}
                                type={node.type} 
                                label={node.label}
                                color={node.color}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};