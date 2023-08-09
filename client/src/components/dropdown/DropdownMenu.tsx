import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material'
import { NotSignedInItems, SignedInItems } from './DropdownItems';


interface DropdownMenuInterface {
    open: boolean;
    anchor: null | HTMLElement;
    handleClose: (event: MouseEvent | TouchEvent) => void;
}

export default function DropdownMenu({ open, anchor, handleClose }: DropdownMenuInterface) {
    return (
        <Popper
            open={open}
            anchorEl={anchor}
            transition
        >
            {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                >
                    <Paper sx={{ mr: 3, mt: 2 }}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                            >
                                {SignedInItems}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}
