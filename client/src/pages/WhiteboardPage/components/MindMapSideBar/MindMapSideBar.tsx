import React, { useCallback, useState } from 'react'
import DraggableNode from '../DraggableNode/DraggableNode'
import { Collapse, IconButton, Paper } from '@mui/material'
import { useReactFlow, XYPosition } from '@xyflow/react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./styles.css";
import StringValueField from '../../../../components/forms/StringValueField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Fab } from '@mui/material';
import { useLibraryTheme } from '../../../../hooks/theme/useLibraryTheme';



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
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const { libTheme } = useLibraryTheme();


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
        <Paper className='sidebar' sx={{
            display: 'flex',
            flexDirection: 'column',
            width: collapsed ? 50 : 320,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                justifyContent: 'center'
            }}>
                <IconButton aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                {!collapsed && <StringValueField label={'Mind Map Name'} data={mindMapName} setter={(e: any) => {
                    setMindMapname(e);
                }} />}
            </div>
            <Collapse in={!collapsed} timeout={300} unmountOnExit>
                {<div className="sidebar-accordions">
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
                </div>}
            </Collapse>
            <Collapse in={!collapsed} timeout={300} unmountOnExit>
                {<div className="sidebar-accordions">

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
                </div>}
            </Collapse>
            <div style={{
                marginTop: 'auto',
                marginBottom: 20
            }}>
                <Fab
                    color={libTheme}
                    size="small"
                    onClick={() => {
                        setCollapsed(!collapsed);
                    }}
                >
                    {collapsed && <ArrowForward />}
                    {!collapsed && <ArrowBackIcon />}
                </Fab>
            </div>
        </Paper>
    )
}
