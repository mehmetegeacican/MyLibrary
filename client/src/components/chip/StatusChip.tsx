import { Chip } from '@mui/material';



interface StatusChipInterface {
    statusLabel: string;
}


export default function StatusChip({ statusLabel}: StatusChipInterface) {
    if (statusLabel === 'Red') {
        return (
            <Chip color='error'  label={statusLabel}/>
        )
    }
    else if (statusLabel === 'Reading') {
        return (
            <Chip color='warning'    label={statusLabel} />
        )
    }
    else if (statusLabel === 'Will Read') {
        return (
            <Chip color='success'  label={statusLabel} />
        )
    }
    else {
        return (
            <Chip color='default' label={statusLabel} />
        )
    }

}
