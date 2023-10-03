import { Chip } from '@mui/material';



interface StatusChipInterface {
    statusLabel: string;
}


export default function StatusChip({ statusLabel}: StatusChipInterface) {
    if (statusLabel === 'Read') {
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
    else if (statusLabel === 'Will Continue') {
        return (
            <Chip color='secondary'  label={statusLabel} />
        )
    }
    else {
        return (
            <Chip color='default' label={statusLabel} />
        )
    }

}
