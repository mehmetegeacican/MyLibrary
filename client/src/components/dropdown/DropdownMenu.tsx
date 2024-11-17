import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material'
import { NotSignedInItems, SignedInItems } from './DropdownItems';
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


interface DropdownMenuInterface {
    open: boolean;
    anchor: null | HTMLElement;
    handleClose: (event: MouseEvent | TouchEvent) => void;
}

export default function DropdownMenu({ open, anchor, handleClose }: DropdownMenuInterface) {
    //Hooks & Contexts
    const {user,dispatch} = useAuthContext();

    const logOut = () => {
        dispatch({type:'LOG_OUT',payload:null});
        dispatch({type:'SET_THEME_COLOR',payload:'secondary'})
        localStorage.removeItem('user');
    }
    
    useEffect(() => {
        if(user){
            SignedInItems[1] = (<MenuItem key={2} onClick={() => logOut()}>Logout</MenuItem>)
        }
    },[user]);
    
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
                                {user ? SignedInItems : NotSignedInItems }
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}
