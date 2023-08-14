import { Chip } from '@mui/material';



interface StatusChipInterface {
    statusLabel: string;
    openModal: () => void;
}


export default function StatusChip({ statusLabel , openModal}: StatusChipInterface) {
    if (statusLabel === 'Red') {
        return (
            <Chip color='error' clickable  onClick = {openModal} label={statusLabel}/>
        )
    }
    else if (statusLabel === 'Reading') {
        return (
            <Chip color='warning' clickable  onClick = {openModal}  label={statusLabel} />
        )
    }
    else if (statusLabel === 'Will Read') {
        return (
            <Chip color='success' clickable  onClick = {openModal}  label={statusLabel} />
        )
    }
    else {
        return (
            <Chip color='default' clickable   onClick = {openModal}  label={statusLabel} />
        )
    }

}
