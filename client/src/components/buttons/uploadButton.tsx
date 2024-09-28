import { Button, styled, useMediaQuery, useTheme } from '@mui/material'
import React from 'react';
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


type UploadButtonInterface = {
    title: string;
    imagePath?: string;
    setImagePath?: Function;
}


export default function UploadButton({ title, imagePath, setImagePath }: UploadButtonInterface) {
    const { libTheme } = useLibraryTheme();
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
            startIcon={<CloudUploadIcon sx={{ height: 25, width: 25 }} />}
            sx={{
                width: '35%',
                '& .MuiButton-label': {
                    display: isSmallScreen ? 'none' : 'inline', // Hide label on small screens
                },
            }}
        >
            {!isSmallScreen && title}
            <VisuallyHiddenInput
                type="file"
                multiple={false}
                onChange={(event) => {

                    const files = event.target.files;

                    if (files && files.length > 0) {
                        // Create an array to store the file name and last modified date
                        const fileDetails = Array.from(files).map((file) => ({
                            name: file.name,
                            lastModified: file.lastModified.toString() 
                        }));

                        // Log the file details (name and last modified)
                        console.log(fileDetails);

                        // If you want to store the image path or file details
                        if (setImagePath) {
                            setImagePath(fileDetails); // Pass the file details instead of just the path
                        }
                    }

                }}
            />
        </Button>
    )
}
