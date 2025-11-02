import React, { useCallback, useState } from 'react'
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges, addEdge,
    Controls, Background, MiniMap, ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Container, Grid, Paper } from '@mui/material';
import SideNav from '../../layout/SideNav';
import MindMapSideBar from './components/MindMapSideBar/MindMapSideBar';
import './MindMapWhiteBoard.css';
import CustomNode from './components/CustomNode/CustomNode';

const initialNodes:any[] = [
    // { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    // { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges:any[] = [
    //{ id: 'n1-n2', source: 'n1', target: 'n2' }
];

const nodeTypes = {
  input: CustomNode,
  default: CustomNode,
  output: CustomNode,
};


export default function MindMapWhiteBoardPage() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot: any) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot: any) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot: any) => addEdge(params, edgesSnapshot)),
        [],
    );
    return (
        <ReactFlowProvider>
            <div className='dndflow'>
                <MindMapSideBar />
                <Paper
                    sx={{
                        width: '80vw',
                        height: '100vh',
                    }}>

                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Background />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </Paper>
            </div>
        </ReactFlowProvider>

    )
}
