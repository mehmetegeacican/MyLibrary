import React, { useCallback } from 'react'
import DraggableNode from '../DraggableNode/DraggableNode'
import { Paper } from '@mui/material'
import { useReactFlow, XYPosition } from '@xyflow/react';
import "./styles.css";

export default function MindMapSideBar() {

    const { setNodes, screenToFlowPosition } = useReactFlow();
    let id = 0;
    const getId = () => `dndnode_${id++}`;

    const handleNodeDrop = useCallback(
        (nodeType: string, screenPosition: XYPosition) => {
            const flow = document.querySelector('.react-flow');
            const flowRect = flow?.getBoundingClientRect();
            const isInFlow =
                flowRect &&
                screenPosition.x >= flowRect.left &&
                screenPosition.x <= flowRect.right &&
                screenPosition.y >= flowRect.top &&
                screenPosition.y <= flowRect.bottom;

            // Create a new node and add it to the flow
            if (isInFlow) {
                const position = screenToFlowPosition(screenPosition);

                const newNode = {
                    id: getId(),
                    type: nodeType,
                    position,
                    data: { label: `${nodeType} node` },
                };

                setNodes((nds) => nds.concat(newNode));
            }
        },
        [setNodes, screenToFlowPosition],
    );

    return (
        <Paper className='sidebar'>
            <div className="description">
                You can drag these nodes to the pane to create new nodes.
            </div>
            <div className="draggable-node-list">
                <DraggableNode className="input" nodeType="input" onDrop={handleNodeDrop}>
                    Input Node
                </DraggableNode>
                <DraggableNode className="default" nodeType="default" onDrop={handleNodeDrop}>
                    Default Node
                </DraggableNode>
                <DraggableNode className="output" nodeType="output" onDrop={handleNodeDrop}>
                    Output Node
                </DraggableNode>
            </div>

        </Paper>
    )
}
