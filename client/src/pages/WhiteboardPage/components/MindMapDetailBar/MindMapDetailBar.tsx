import { ArrowForward, ArrowBack, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Collapse, Fab, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useLibraryTheme } from "../../../../hooks/theme/useLibraryTheme";
import StringValueField from "../../../../components/forms/StringValueField";
import { theme } from "antd";

interface DetailPropsInterface {
    selectedMindMapNode: any,
    selectedMindMapEdge: any
}

export default function MindMapDetailBar({
    selectedMindMapNode,
    selectedMindMapEdge
}: DetailPropsInterface) {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [detailPageOpen, setDetailPageOpen] = useState<boolean>(false);
    const { libTheme } = useLibraryTheme();


    useEffect(() => {
        console.log("Selected Mind Map, ", selectedMindMapNode, selectedMindMapEdge);
    }, [selectedMindMapEdge, selectedMindMapNode])

    return (
        <Paper className='sidebar' sx={{
            display: 'flex',
            flexDirection: 'column',
            width: collapsed ? 38 : 550,
            transition: 'width 0.3s ease',
            overflow: 'visible',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                justifyContent: 'center'
            }}>
                {!collapsed && <StringValueField label={'Node Title'} data={""} setter={(e: any) => {

                }} />}
            </div>
            <Collapse in={!collapsed} timeout={300} unmountOnExit>
                <div className="sidebar-accordions">
                    <Accordion key={0} expanded={detailPageOpen} onChange={() => setDetailPageOpen(!detailPageOpen)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }} component={'span'} variant={'body2'} >
                                Information
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label='Enter Info here'
                                multiline
                                rows={10}
                                variant="outlined"
                                color={libTheme}
                                style={{
                                    width:"100%"
                                }}
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>
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
                    {collapsed && <ArrowBack />}
                    {!collapsed && <ArrowForward />}
                </Fab>
            </div>
        </Paper>
    )

}