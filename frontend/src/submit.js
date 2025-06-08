import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const submitPipeline = async () => {
        setIsLoading(true);
        
        try {
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            setAlert({
                type: 'success',
                data: result
            });

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            
            setAlert({
                type: 'error',
                message: error.message || 'Failed to submit pipeline'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setAlert(null);
    };

    return (
        <>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}

            {alert && <PipelineAlert alert={alert} onClose={closeAlert} />}

            <button 
                className="submit-button"
                onClick={submitPipeline}
                disabled={isLoading || nodes.length === 0}
                style={{
                    position: 'fixed',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: '40px',
                    zIndex: 1000,
                    opacity: (isLoading || nodes.length === 0) ? 0.6 : 1,
                    cursor: (isLoading || nodes.length === 0) ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 24px rgba(79,70,229,0.18)',
                    padding: '18px 40px',
                    fontSize: '18px',
                    borderRadius: '8px',
                    fontWeight: 700
                }}
            >
                {isLoading ? 'Analyzing Pipeline...' : 'Submit Pipeline'}
            </button>
        </>
    );
};

// Alert component
const PipelineAlert = ({ alert, onClose }) => {
    if (alert.type === 'error') {
        return (
            <div className="pipeline-alert">
                <button className="close-button" onClick={onClose}>×</button>
                <h3 style={{ color: '#dc2626' }}>Error</h3>
                <div className="alert-content">
                    <p>{alert.message}</p>
                </div>
            </div>
        );
    }

    const { num_nodes, num_edges, is_dag } = alert.data;

    return (
        <div className="pipeline-alert">
            <button className="close-button" onClick={onClose}>×</button>
            <h3>Pipeline Analysis Complete</h3>
            
            <div className="alert-stats">
                <div className="stat-item">
                    <span className="stat-value">{num_nodes}</span>
                    <span className="stat-label">Nodes</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{num_edges}</span>
                    <span className="stat-label">Connections</span>
                </div>
            </div>

            <div className={`dag-status ${is_dag ? 'valid' : 'invalid'}`}>
                <span>{is_dag ? '✓' : '✗'}</span>
                <span>
                    {is_dag 
                        ? 'Valid DAG (Directed Acyclic Graph)' 
                        : 'Invalid - Contains cycles or errors'
                    }
                </span>
            </div>
            
            <div className="alert-content" style={{ marginTop: '12px' }}>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                    {is_dag 
                        ? 'Your pipeline structure is valid and ready for execution.'
                        : 'Please check your pipeline for circular dependencies.'
                    }
                </p>
            </div>
        </div>
    );
};