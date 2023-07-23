import { Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { TabInterface } from "../../interfaces/TabInterfaces";



interface TabProps {
    tabElements: TabInterface[];
    tabValue: number;
    setTabValue: Function;
}


export default function Tabbar({ tabElements, tabValue, setTabValue }: TabProps) {
    //Hookd
    const [val, setVal] = React.useState<number>(0);

    //UseEffect for efficient rendering
    useEffect(() => {
        setTabValue(val);
    }, [val]);

    return (
        <Tabs value={tabValue} onChange={() => setTabValue(val)} centered>
            {tabElements.map((tab: any, index: number) => {
                return <Tab key={index} value={index} icon={tab.icon} label={tab.label} onClick={() => setVal(index)} />;
            })
            }
        </Tabs>
    )
}
