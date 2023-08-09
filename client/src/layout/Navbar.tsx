import { Badge, IconButton, Toolbar, Typography, styled } from '@mui/material';
import { drawerWidth } from '../constants/sizes';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import UserIcon from '@mui/icons-material/Person'
import React from 'react';
import DropdownMenu from '../components/dropdown/DropdownMenu';

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
    //Hooks
    const [openMenu,setOpenMenu] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleToggle = (event:React.MouseEvent<HTMLElement>) => {
        setOpenMenu((prevOpen) => !prevOpen);
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = (event: Event | React.SyntheticEvent) => {
        setAnchorEl(null);
        setOpenMenu(false);
      };

    return (
        <AppBar position="absolute" open={open} color='secondary' >
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
                <IconButton color="inherit" onClick={handleToggle}>
                    <Badge>
                        <UserIcon />
                    </Badge>
                    <DropdownMenu open={openMenu} anchor={anchorEl || null}  handleClose={handleClose}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
