import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import {
    ExpandMore
} from '@mui/icons-material';
import { AccordionData } from '../../interfaces/AccordionInterfaces';


interface AccordionInterface {
    expanded: string | false;
    handleChange: Function;
    accordions: AccordionData[];
}

export default function LibraryAccordion({ expanded, handleChange, accordions }: AccordionInterface) {

    const getAccordionDatas = (accordions: AccordionData[]) => {

        return accordions && accordions.map((accordion: AccordionData, index: number) => {
            return (
                <Accordion key={index} expanded={expanded === accordion.title} onChange={handleChange(accordion.title)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} component={'span'} variant={'body2'} >
                            {accordion.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }} component={'span'} variant={'body2'} >{accordion.info}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {accordion.data}
                    </AccordionDetails>
                </Accordion>
            );
        })
    }

    return (
        <>{getAccordionDatas(accordions)}</>
    );

}
