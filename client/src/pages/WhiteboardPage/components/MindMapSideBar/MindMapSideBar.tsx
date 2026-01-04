import React, { useCallback, useState } from 'react'
import DraggableNode from '../DraggableNode/DraggableNode'
import { IconButton, Paper } from '@mui/material'
import { useReactFlow, XYPosition } from '@xyflow/react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./styles.css";
import StringValueField from '../../../../components/forms/StringValueField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



export default function MindMapSideBar({
    settings,
    setSettings
}: {
    settings: {
        miniMapOpen: boolean,
        zoomOpen: boolean
    },
    setSettings: Function
}) {

    const { setNodes, screenToFlowPosition } = useReactFlow();
    let id = 0;
    const getId = () => `dndnode_${id++}`;
    const [mindMapName, setMindMapname] = useState<string>("");
    const [openNodeAccordion, setOpenNodeAccordion] = useState<boolean>(false);
    const [openEdgeAccordion, setOpenEdgeAccordion] = useState<boolean>(false);
    const [openSettings, setOpenSettings] = useState<boolean>(false);


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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                justifyContent: 'center'
            }}>
                <IconButton aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <StringValueField label={'Mind Map Name'} data={mindMapName} setter={(e: any) => {
                    setMindMapname(e);
                }} />
            </div>
            <div className="sidebar-accordions">
                <Accordion key={0} expanded={openNodeAccordion} onChange={() => setOpenNodeAccordion(!openNodeAccordion)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} component={'span'} variant={'body2'} >
                            Nodes
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                </Accordion>
                <Accordion key={1} expanded={openEdgeAccordion} onChange={() => setOpenEdgeAccordion(!openEdgeAccordion)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} component={'span'} variant={'body2'} >
                            Edges
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="sidebar-accordions">

                <Accordion key={2} expanded={openSettings} onChange={() => setOpenSettings(!openSettings)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} component={'span'} variant={'body2'} >
                            Settings
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={settings.miniMapOpen}
                                onChange={() => {
                                    setSettings((prev: any) => ({
                                        ...prev,
                                        miniMapOpen: !prev.miniMapOpen
                                    }))
                                }} />} label="Mini Map" />
                            <FormControlLabel control={<Switch checked={settings.zoomOpen} onChange={() => {
                                setSettings((prev: any) => ({
                                    ...prev,
                                    zoomOpen: !prev.zoomOpen
                                }))
                            }} />} label="Zoom Bar" />

                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Paper>
    )
}
