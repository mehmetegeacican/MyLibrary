import React, { useMemo, useState } from 'react'
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext';
import { Box, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material';
import BarChart from '../../data/charts/BarChart';
import DougnutChart from '../../data/charts/DougnutChart';
import PolarAreaChart from '../../data/charts/PolarAreaChart';
import FilterListIcon from '@mui/icons-material/FilterList';
import { isBookByAuthorStat, isBookByCategoryrStat } from '../../data/charts/chartDataCheck';



interface IChartData {
    dataCounts: any
}

export default function ComparisonChart({ dataCounts }: IChartData) {
    const { user } = useAuthContext();
    const [menu, setMenu] = useState<string>('Most Frequent');
    const [freq, setFreq] = useState<number>(10);
    const [graphType, setGraphType] = useState<string>("Polar Area");

    /**
     * Menu Dropdown
     * @returns Component for Author Select
     */
    const MenuSelect = () => {
        const handleChange = (event: SelectChangeEvent) => {
            setMenu(event.target.value as string);
        };
        return (
            <FormControl sx={{ m: 0.5, minWidth: 80 }}>
                <Select
                    labelId="authorMenuLabel"
                    id="authorMenuSelect"
                    value={menu}
                    onChange={handleChange}
                >
                    <MenuItem value={"Most Frequent"}>Most Frequent</MenuItem>
                    <MenuItem value={"Least Frequent"}>Least Frequent</MenuItem>
                </Select>
            </FormControl>
        )
    };

    /**
     * Frequency Dropdown
     * @returns Component for Author Select
     */
    const FreqSelect = () => {
        const handleChangeFreq = (event: SelectChangeEvent) => {
            const num = parseInt(event.target.value)
            setFreq(num);
        };
        return (
            <FormControl sx={{ m: 0.5, minWidth: 80 }}>
                <Select
                    labelId="authorMenuLabel"
                    id="authorMenuSelect"
                    value={freq.toString()}
                    onChange={handleChangeFreq}
                >
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"15"}>15</MenuItem>
                    <MenuItem value={"20"}>20</MenuItem>
                    <MenuItem value={"25"}>25</MenuItem>
                </Select>
            </FormControl>
        )
    };

    /**
    * 
    * @returns Component for Author Select
    */
    const GraphTypeSelect = () => {
        const handleChangeGraph = (event: SelectChangeEvent) => {
            setGraphType(event.target.value as string);
        };
        return (
            <FormControl sx={{ m: 0.5, minWidth: 80 }}>
                <Select
                    labelId="authorMenuLabel"
                    id="authorMenuSelect"
                    value={graphType}
                    onChange={handleChangeGraph}
                >
                    <MenuItem value={"Bar"}>Bar Graph</MenuItem>
                    <MenuItem value={"Dougnut"}>Dougnut Chart</MenuItem>
                    <MenuItem value={"Polar Area"}>Polar Area</MenuItem>

                </Select>
            </FormControl>
        )
    };


    /**
     * Graph to be Rendered
     */
    const DataGraph = () => {
        if (graphType === 'Bar') {
            return <BarChart chartData={memoizedStats} />
        }
        else if (graphType === 'Dougnut') {
            return <DougnutChart chartData={memoizedStats} />
        }
        else {
            return <PolarAreaChart chartData={memoizedStats} />
        }

    }

    /**
     * Memoized Data to be shown on the Graph
     */
    const memoizedStats = useMemo(() => {
        if (!Array.isArray(dataCounts)) {
            return [];
        }
        else {
            // If Stat is Author Stat
            if (dataCounts.length > 0 && isBookByAuthorStat(dataCounts[0])) {
                if (menu === "Most Frequent") {
                    return dataCounts.slice(0, freq) || [];
                }
            }
            else if (dataCounts.length > 0 && isBookByCategoryrStat(dataCounts[0])) {
                if (menu === "Most Frequent") {
                    return dataCounts.slice(0, freq) || [];
                }
                else if (menu === "Least Frequent") {

                    return dataCounts.slice(-freq) || [];
                }
            }
            return [];
        }

    }, [dataCounts, menu, freq]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mb: 1, // Margin bottom for spacing
                }}
            >
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Dropdown 1 */}
                    <GraphTypeSelect />
                    {/* Dropdown 2 */}
                    <MenuSelect />
                    {/*2*/}
                    {(menu === 'Most Frequent' || menu === 'Least Frequent') && <FreqSelect />}
                    {/* Selection Dialog */}
                    <Tooltip title="Manual Selection" arrow placement="top-start" onClick={() => console.log("aa")}>
                        <IconButton aria-label="filter" sx={{
                            mr:2
                        }}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <DataGraph />
        </>
    )
}
