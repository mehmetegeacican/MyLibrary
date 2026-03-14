import { useState } from 'react'
import {
    ReactFlow,
    Controls, Background, MiniMap, ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Paper } from '@mui/material';
import MindMapSideBar from './components/MindMapSideBar/MindMapSideBar';
import './MindMapWhiteBoard.css';
import CustomNode from './components/CustomNode/CustomNode';
import MindMapDetailBar from './components/MindMapDetailBar/MindMapDetailBar';
import { IMindMap } from '../../interfaces/DataInterfaces';
import { useParams } from 'react-router-dom';
import { useMindMap } from '../../hooks/mindMapHooks';

const nodeTypes = {
    input: CustomNode,
    default: CustomNode,
    output: CustomNode,
};


export default function MindMapWhiteBoardPage() {
    const { id } = useParams();
    const [title, setTitle] = useState<string>("");
    const [settings, setSettings] = useState({
        miniMapOpen: true,
        zoomOpen: true,
        fitView: false
    });
    const {
        nodes,
        edges,
        selectedNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onSelectionChange,
        updateNodeData,
    } = useMindMap();
    


    const handleMindMapUpdate = async () => {
        if (id) {
            const updatedMindMap: IMindMap = {
                _id: id,
                title: title,
            }
            console.log(updatedMindMap);
        }
    };

    return (
        <ReactFlowProvider>
            <div className='dndflow'>
                <Paper
                    sx={{
                        display: 'flex',
                        width: '100vw',
                        height: '99.8vh',
                    }}>
                    <MindMapSideBar
                        settings={settings}
                        setSettings={setSettings}
                        title={title}
                        setTitle={setTitle}
                        save={handleMindMapUpdate}
                    />
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
                    {<MindMapDetailBar selectedMindMapNode={selectedNode} updateNodeData={updateNodeData} />}
                </Paper>
            </div>
        </ReactFlowProvider>

    )
}
