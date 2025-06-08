
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
            padding: '10px 16px', 
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            overflowX: 'auto',
            width: '100%',
            minHeight: '60px',
            maxHeight: '72px',
            scrollbarWidth: 'thin',
            zIndex: 10
        }}>
            <h2 style={{ 
                margin: '0', 
                color: '#1e293b',
                fontSize: '18px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                paddingRight: '18px',
                borderRight: '1px solid #e2e8f0'
            }}>
                Pipeline Builder
            </h2>
            
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '24px',
                alignItems: 'center',
                flex: '1',
                minWidth: 0,
                overflowX: 'auto',
            }}>
                {nodeCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} style={{ 
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '0 8px',
                        borderRight: categoryIndex !== nodeCategories.length - 1 ? '1px solid #e2e8f0' : 'none',
                        marginRight: categoryIndex !== nodeCategories.length - 1 ? '8px' : 0
                    }}>
                        <span style={{ 
                            color: '#475569',
                            fontSize: '14px',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            marginRight: '8px'
                        }}>
                            {category.title}
                        </span>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'row',
                            gap: '10px',
                            paddingLeft: '8px',
                            borderLeft: '1px solid #e2e8f0'
                        }}>
                            {category.nodes.map((node) => (
                                <div key={node.type} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '64px',
                                    maxWidth: '80px',
                                    height: '48px',
                                    background: '#fff',
                                    border: `2px solid ${node.color}`,
                                    borderRadius: '10px',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                                    cursor: 'grab',
                                    transition: 'box-shadow 0.2s',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    color: node.color,
                                    userSelect: 'none',
                                }}
                                draggable
                                onDragStart={(event) => {
                                    const appData = { nodeType: node.type };
                                    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
                                    event.dataTransfer.effectAllowed = 'move';
                                }}
                                >
                                    <div style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        backgroundColor: node.color,
                                        marginBottom: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }} />
                                    <span style={{
                                        color: node.color,
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                    }}>{node.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};