import React, { useMemo } from 'react'
import { useAuthContext } from '../contextHooks/useAuthContext';
import { OverridableStringUnion } from '@mui/types';
import { AppBarPropsColorOverrides } from '@mui/material';

export const useLibraryTheme = () => {
    const { themeColor  } = useAuthContext();

    const theme: OverridableStringUnion<"primary" | "secondary" | "error" | "warning" | "success" | "transparent", AppBarPropsColorOverrides> = useMemo(() => {
        switch(themeColor) {
            case 'primary':
                return 'primary';
            case 'secondary':
                return 'secondary';
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            case 'success':
                return 'success';
            default:
                return 'secondary';
        }
    }, [themeColor]);

    return {
        theme
    };
}
