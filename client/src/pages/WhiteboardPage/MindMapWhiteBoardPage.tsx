import { useCallback, useState } from 'react'
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges, addEdge,
    Controls, Background, MiniMap, ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Paper } from '@mui/material';
import MindMapSideBar from './components/MindMapSideBar/MindMapSideBar';
import './MindMapWhiteBoard.css';
import CustomNode from './components/CustomNode/CustomNode';
import MindMapDetailBar from './components/MindMapDetailBar/MindMapDetailBar';
import { IMindMapEdge, IMindMapNode } from '../../interfaces/DataInterfaces';
import { MIND_MAP_NODE_DATA_ATTRIBUTE } from '../../enums/enums';

const initialNodes: any[] = [
    // { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    // { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges: any[] = [
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
    const [settings, setSettings] = useState({
        miniMapOpen: true,
        zoomOpen: true,
        fitView: false
    });
    const [selectedNode, setSelectedNode] = useState<IMindMapNode | null>(null);
    const [selectedEdge, setSelectedEdge] = useState<IMindMapEdge | null>(null);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot: any) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot: any) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const onSelectionChange = useCallback((params: { nodes: any[]; edges: any[] }) => {
        setSelectedNode(params.nodes.length > 0 ? params.nodes[0] : null);
        setSelectedEdge(params.edges.length > 0 ? params.edges[0] : null);
    }, []);

    const updateNodeData = useCallback((nodeId: string, newData: string, updatedDataType: MIND_MAP_NODE_DATA_ATTRIBUTE) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node._id === nodeId) {
                    const result = {
                        ...node,
                        data: {
                            ...node?.data,
                            [updatedDataType]: newData
                        }
                    };
                    setSelectedNode(result);
                    return result;
                }
                return node;
            })
        );
    }, [setNodes]);

    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot: any) => addEdge(params, edgesSnapshot)),
        [],
    );
    return (
        <ReactFlowProvider>
            <div className='dndflow'>

                <Paper
                    sx={{
                        display: 'flex',
                        width: '100vw',
                        height: '99.8vh',
                    }}>
                    <MindMapSideBar settings={settings} setSettings={setSettings} />
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onSelectionChange={onSelectionChange}
                        nodeTypes={nodeTypes}
                        fitView={settings.fitView}
                    >
                        <Background />
                        {settings.zoomOpen && <Controls />}
                        {settings.miniMapOpen && <MiniMap />}
                    </ReactFlow>
                    <MindMapDetailBar selectedMindMapNode={selectedNode} updateNodeData={updateNodeData} />
                </Paper>
            </div>
        </ReactFlowProvider>

    )
}
