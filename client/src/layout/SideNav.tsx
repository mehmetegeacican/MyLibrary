import { Divider, IconButton, List, Toolbar, styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { drawerWidth } from '../constants/sizes';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, mainListItemsSignedOut, proListItems, secondaryListItems } from './NavItems';
import { useAuthContext } from '../hooks/contextHooks';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


interface DrawerProps {
    open: boolean;
    toggleDrawer: Function;
}

export default function SideNav({ open, toggleDrawer }: DrawerProps) {
    const {user,plan} = useAuthContext();
    return (
        <Drawer variant="permanent" open={open} sx={{ height: '100vh' }}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={() => toggleDrawer()}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {user  &&  mainListItems}
                {!user && mainListItemsSignedOut}
                <Divider sx={{ my: 0.1}} />
                {/*secondaryListItems*/}
                {user && proListItems}
                {user &&  <Divider sx={{my:0.1}}/>}
                {user  &&  secondaryListItems}
            </List>
        </Drawer>
    )
}
