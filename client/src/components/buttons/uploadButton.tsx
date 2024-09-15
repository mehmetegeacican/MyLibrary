import { Button, styled, useMediaQuery , useTheme } from '@mui/material'
import React from 'react';
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



export default function UploadButton() {
    const {libTheme} = useLibraryTheme();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg')); // Adjust as needed (e.g., 'md', 'xs')

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <Button
            component="label"
            variant="contained"
            color={libTheme}
            tabIndex={-1}
            startIcon={<CloudUploadIcon  sx={{height:25,width:25}}/>}
            sx={{
                width: '35%',
                '& .MuiButton-label': {
                    display: isSmallScreen ? 'none' : 'inline', // Hide label on small screens
                },
            }}
        >
            {!isSmallScreen && "Upload Profile Picture"}
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
            />
        </Button>
    )
}
