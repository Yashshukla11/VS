export const DraggableNode = ({ type, label, color = '#64748b' }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType }
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className={type}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            style={{ 
                cursor: 'grab', 
                minWidth: '100px', 
                height: '70px',
                display: 'flex', 
                alignItems: 'center', 
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: `2px solid ${color}`,
                justifyContent: 'center', 
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
            }} 
            onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
            draggable
        >
            <div style={{
                width: '100%',
                height: '4px',
                backgroundColor: color,
                position: 'absolute',
                top: 0,
                left: 0
            }} />
            
            <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: color,
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff'
                }} />
            </div>
            
            {/* Node label */}
            <span style={{ 
                color: color,
                fontSize: '13px',
                fontWeight: '600',
                textAlign: 'center'
            }}>
                {label}
            </span>
        </div>
    );
};