import React, { useCallback, useState } from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Controls, Background, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Container, Grid, Paper } from '@mui/material';

const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

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
        <Container maxWidth="lg" sx={{ mt: 7, mb: 4 }}>
            <Grid container spacing={3}>
                <Paper
                    sx={{
                        width: '100vw', height: '85vh',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                    >
                        <Background />
                        <Controls />
                        <MiniMap/>
                    </ReactFlow>
                </Paper>
            </Grid>

        </Container>

    )
}
