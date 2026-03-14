import { useEffect, useState } from 'react'
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
import { fetchMindMapByID, updateExistingMindMap } from '../../apis/mindMapApis';
import { useAuthContext } from '../../hooks/contextHooks';
import { useUtils } from '../../hooks/utils/useUtils';
import { MESSAGE_TYPES } from '../../enums/enums';

const nodeTypes = {
    input: CustomNode,
    default: CustomNode,
    output: CustomNode,
};


export default function MindMapWhiteBoardPage() {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [title, setTitle] = useState<string>("");
    const { renderMessage, contextHolder } = useUtils();

    const [settings, setSettings] = useState({
        miniMapOpen: true,
        zoomOpen: true,
        fitView: false
    });
    const {
        nodes,
        edges,
        setNodes,
        selectedNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onSelectionChange,
        updateNodeData,
    } = useMindMap();

    const getMindMapById = async (id: string | undefined) => {
        if (id && user) {
            const data = await fetchMindMapByID(id, user.token)
            console.log(data);
            setTitle(data?.title);
            const formattedNodes = data.nodes.map((node: any) => ({
                ...node,
                id: node._id
            }));
            setNodes(formattedNodes);
        }
    }

    const handleMindMapUpdate = async () => {
        if (id) {
            const updatedNodes = nodes.map((node: any) => {
                return {
                    type:node?.type,
                    position: node?.position,
                    data: node?.data
                }
            })
            console.log(nodes);
            const updatedMindMap: Pick<any, "title" | "nodes"> = {
                title: title,
                nodes: updatedNodes
            }
            user && await updateExistingMindMap(id, updatedMindMap, user.token);
            renderMessage(MESSAGE_TYPES.SUCCESS, "Mind Map Saved");
        }
    };


    useEffect(() => {
        getMindMapById(id);
    }, []);

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
                    {contextHolder}
                </Paper>

            </div>
        </ReactFlowProvider>

    )
}
