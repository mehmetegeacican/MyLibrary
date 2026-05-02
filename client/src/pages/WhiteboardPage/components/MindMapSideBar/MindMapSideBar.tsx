import { useCallback, useEffect, useMemo, useState } from 'react'
import DraggableNode from '../DraggableNode/DraggableNode'
import { Button, Collapse, IconButton, Paper, Radio, RadioGroup, TextField, Tooltip } from '@mui/material'
import { useReactFlow, XYPosition } from '@xyflow/react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import "./styles.css";
import StringValueField from '../../../../components/forms/StringValueField';
import { ArrowBack, ArrowForward, ExpandMore } from '@mui/icons-material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Fab } from '@mui/material';
import { useLibraryTheme } from '../../../../hooks/theme/useLibraryTheme';
import { useUtils } from '../../../../hooks/utils/useUtils';
import SaveIcon from '@mui/icons-material/Save';
import { IMindMapEdge } from '../../../../interfaces/DataInterfaces';
import { MIND_MAP_EDGE_DATA_ATTRIBUTE } from '../../../../enums/enums';




export default function MindMapSideBar({
    title,
    setTitle,
    settings,
    setSettings,
    save,
    selectedEdge,
    updateEdgeData
}: {
    title: string,
    setTitle: Function,
    settings: {
        miniMapOpen: boolean,
        zoomOpen: boolean,
        fitView: boolean,
        autoSave: boolean
    },
    setSettings: Function,
    save: Function,
    selectedEdge: IMindMapEdge | null,
    updateEdgeData: Function
}) {

    const { setNodes, screenToFlowPosition } = useReactFlow();
    const [openNodeAccordion, setOpenNodeAccordion] = useState<boolean>(false);
    const [openEdgeAccordion, setOpenEdgeAccordion] = useState<boolean>(false);
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const { libTheme } = useLibraryTheme();
    const { generateMongoId } = useUtils();


    const memoizedSelectedEdge = useMemo(() => {
        return selectedEdge;
    }, [selectedEdge]);



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

            if (isInFlow) {
                const position = screenToFlowPosition(screenPosition);
                const assignedId = generateMongoId();
                const newNode = {
                    id: assignedId,
                    _id: assignedId,
                    type: nodeType,
                    position,
                    data: { label: `${nodeType} node` },
                };

                setNodes((nds) => nds.concat(newNode));
            }
        },
        [setNodes, screenToFlowPosition],
    );

    useEffect(() => {
        const open = selectedEdge !== null;
        setOpenEdgeAccordion(open);
    }, [selectedEdge]);

    return (
        <Paper className='sidebar' sx={{
            display: 'flex',
            flexDirection: 'column',
            width: collapsed ? 38 : 279,
            transition: 'width 0.3s ease',
            overflow: 'visible',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                justifyContent: 'center'
            }}>
                <IconButton aria-label="back">
                    <ArrowBack />
                </IconButton>
                {!collapsed && <StringValueField label={'Mind Map Name'} data={title} setter={(e: any) => {
                    setTitle(e);
                }} />}
            </div>
            <Collapse in={!collapsed} timeout={300} unmountOnExit>
                {<div className="sidebar-accordions">
                    <Accordion key={0} expanded={openNodeAccordion} onChange={() => setOpenNodeAccordion(!openNodeAccordion)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
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
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }} component={'span'} variant={'body2'} >
                                Edges
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <RadioGroup name="use-radio-group" key={memoizedSelectedEdge?._id} value={memoizedSelectedEdge?.data?.strokeStyle} onChange={(e: any) => {
                                memoizedSelectedEdge?._id && updateEdgeData(memoizedSelectedEdge?._id, e.target.value, MIND_MAP_EDGE_DATA_ATTRIBUTE.STROKE_STYLE);
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <FormControlLabel value="solid" control={<Radio color={libTheme} size='medium' />} label="Normal" />
                                    <FormControlLabel value="dashed" control={<Radio color={libTheme} size='medium' />} label="Dashed" />
                                </div>

                            </RadioGroup>
                        </AccordionDetails>
                        <AccordionDetails>
                            <TextField
                                label="Edge Color"
                                type="color"
                                value={selectedEdge?.data?.color}
                                onChange={(e) => updateEdgeData(memoizedSelectedEdge?._id, e.target.value, MIND_MAP_EDGE_DATA_ATTRIBUTE.COLOR)}
                                size="small"
                                fullWidth
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>}
            </Collapse>

            <Collapse in={!collapsed} timeout={300} unmountOnExit>
                {<div className="sidebar-accordions">

                    <Accordion key={2} expanded={openSettings} onChange={() => setOpenSettings(!openSettings)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
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
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.zoomOpen}
                                            onChange={() => {
                                                setSettings((prev: any) => ({
                                                    ...prev,
                                                    zoomOpen: !prev.zoomOpen
                                                }))
                                            }} />

                                    }
                                    color={libTheme}
                                    label="Zoom Bar"
                                />
                                <FormControlLabel control={<Switch checked={settings.fitView} onChange={() => {
                                    setSettings((prev: any) => ({
                                        ...prev,
                                        fitView: !prev.fitView
                                    }))
                                }} />} label="Zoom in on initial insert" />

                                <FormControlLabel control={<Switch checked={settings.autoSave} onChange={() => {
                                    setSettings((prev: any) => ({
                                        ...prev,
                                        autoSave: !prev.autoSave
                                    }))
                                }} />} label="AutoSave" />

                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                </div>}
            </Collapse>
            {!collapsed &&
                <Button
                    sx={{ alignItems: "center", maxWidth: 300 }}
                    variant='outlined'
                    color={libTheme}
                    startIcon={<SaveIcon />}
                    onClick={() => {
                        save()
                    }}> Save </Button>}
            {collapsed &&
                <Tooltip title="Save">
                    <IconButton
                        aria-label="save"
                        color={libTheme}
                        onClick={() => {
                            save()
                        }}>
                        <SaveIcon />
                    </IconButton>
                </Tooltip>}
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
                    {!collapsed && <ArrowBack />}
                </Fab>
            </div>
        </Paper>
    )
}
