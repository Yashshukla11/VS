// store.js - Enhanced with better node management
import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    
    addNode: (node) => {
        // Add updateNodeField function to node data
        const nodeWithUpdate = {
            ...node,
            data: {
                ...node.data,
                updateNodeField: get().updateNodeField
            }
        };
        
        set({
            nodes: [...get().nodes, nodeWithUpdate]
        });
    },
    
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    
    onConnect: (connection) => {
        set({
            edges: addEdge({
                ...connection, 
                type: 'smoothstep', 
                animated: true, 
                markerEnd: {
                    type: MarkerType.Arrow, 
                    height: '20px', 
                    width: '20px'
                }
            }, get().edges),
        });
    },
    
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: { 
                            ...node.data, 
                            [fieldName]: fieldValue 
                        }
                    };
                }
                return node;
            }),
        });
    },
    
    // Helper functions for pipeline analysis
    getNodeById: (nodeId) => {
        return get().nodes.find(node => node.id === nodeId);
    },
    
    getEdgesByNodeId: (nodeId) => {
        return get().edges.filter(edge => 
            edge.source === nodeId || edge.target === nodeId
        );
    },
    
    // Clear all nodes and edges
    clearPipeline: () => {
        set({
            nodes: [],
            edges: [],
            nodeIDs: {}
        });
    },
    
    // Get pipeline statistics
    getPipelineStats: () => {
        const nodes = get().nodes;
        const edges = get().edges;
        
        return {
            totalNodes: nodes.length,
            totalEdges: edges.length,
            nodeTypes: nodes.reduce((acc, node) => {
                acc[node.type] = (acc[node.type] || 0) + 1;
                return acc;
            }, {}),
            connectedNodes: [...new Set([
                ...edges.map(edge => edge.source),
                ...edges.map(edge => edge.target)
            ])].length,
            isolatedNodes: nodes.filter(node => 
                !edges.some(edge => 
                    edge.source === node.id || edge.target === node.id
                )
            ).length
        };
    }
}));