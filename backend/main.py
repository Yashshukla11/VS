from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the given nodes and edges form a Directed Acyclic Graph (DAG)
    Uses Kahn's algorithm for topological sorting
    """
    if not nodes:
        return True
    
    # Create adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize all nodes with in-degree 0
    node_ids = {node.id for node in nodes}
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            graph[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Find all nodes with no incoming edges
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    processed_count = 0
    
    # Process nodes with no incoming edges
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # For each neighbor of current node
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    return processed_count == len(node_ids)

@app.get('/')
def read_root():
    return {'message': 'VectorShift Pipeline API', 'status': 'running'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline_data: PipelineData):
    """
    Parse the pipeline and return analysis results
    """
    try:
        nodes = pipeline_data.nodes
        edges = pipeline_data.edges
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        is_valid_dag = is_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_valid_dag,
            'status': 'success'
        }
    
    except Exception as e:
        return {
            'num_nodes': 0,
            'num_edges': 0,
            'is_dag': False,
            'status': 'error',
            'message': str(e)
        }

@app.get('/health')
def health_check():
    """Health check endpoint"""
    return {'status': 'healthy'}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)