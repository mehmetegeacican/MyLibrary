import { Chip } from '@mui/material';



interface StatusChipInterface {
    statusLabel: string;
}


export default function StatusChip({ statusLabel }: StatusChipInterface) {
    if (statusLabel === 'Red') {
        return (
            <Chip color='error' clickable label={statusLabel} />
        )
    }
    else if (statusLabel === 'Reading') {
        return (
            <Chip color='warning' clickable label={statusLabel} />
        )
    }
    else if (statusLabel === 'Will Read') {
        return (
            <Chip color='success' clickable label={statusLabel} />
        )
    }
    else {
        return (
            <Chip color='default' clickable label={statusLabel} />
        )
    }

}
