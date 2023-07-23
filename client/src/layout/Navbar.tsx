import { Badge, IconButton, Toolbar, Typography, styled } from '@mui/material';
import { drawerWidth } from '../constants/sizes';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import UserIcon from '@mui/icons-material/Person'

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface NavbarProps {
    open: boolean;
    toggleDrawer: Function;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export default function Navbar({ open, toggleDrawer }: NavbarProps) {
    return (
        <AppBar position="absolute" open={open} color='secondary'>
            <Toolbar
                sx={{
                    pr: '25px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => toggleDrawer()}
                    sx={{

                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    
                >
                    My library
                </Typography>
                <IconButton color="inherit">
                    <Badge>
                        <UserIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
