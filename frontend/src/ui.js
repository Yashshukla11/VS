// ui.js - Updated with new node types
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Import existing nodes
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

// Import new nodes
import { MathNode } from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { DelayNode } from './nodes/delayNode';
import { TransformNode } from './nodes/transformNode';
import { ConditionalNode } from './nodes/conditionalNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Updated node types with new nodes
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  transform: TransformNode,
  conditional: ConditionalNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { 
        id: nodeID, 
        nodeType: `${type}`,
        // Add updateNodeField function reference
        updateNodeField: (id, field, value) => {
          // This will be handled by the store
        }
      };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                style={{ background: '#f8fafc' }}
            >
                <Background 
                  color="#e2e8f0" 
                  gap={gridSize} 
                  style={{ opacity: 0.5 }}
                />
                <Controls 
                  style={{
                    button: {
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      color: '#475569'
                    }
                  }}
                />
                <MiniMap 
                  nodeColor={(node) => {
                    switch (node.type) {
                      case 'customInput': return '#0ea5e9';
                      case 'customOutput': return '#ef4444';
                      case 'llm': return '#8b5cf6';
                      case 'text': return '#d97706';
                      case 'math': return '#3b82f6';
                      case 'filter': return '#6366f1';
                      case 'delay': return '#f59e0b';
                      case 'transform': return '#8b5cf6';
                      case 'conditional': return '#ec4899';
                      default: return '#64748b';
                    }
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0'
                  }}
                />
            </ReactFlow>
        </div>
        </>
    )
}