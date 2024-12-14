import React, { useEffect, useMemo } from 'react'
import { useAuthContext } from '../contextHooks/useAuthContext';
import { OverridableStringUnion } from '@mui/types';
import { AppBarPropsColorOverrides } from '@mui/material';
import { getUserById } from '../../apis/userApis';

export const useLibraryTheme = () => {
    const { user, dispatch, themeColor } = useAuthContext();


    const fetchUserData = async (id: string, token: string) => {
        try {
            const result = await getUserById(id, token);
            if (result.theme_color) {
                dispatch({ type: 'SET_THEME_COLOR', payload: result.theme_color });
                dispatch({ type: 'SET_PLAN' , payload: result.plan });
            }
        } catch (e) {
            return e;
        }
    }


    useEffect(() => {
        if(user?.id && user){
            fetchUserData(user?.id.toString(),user?.token);
        }
    },[user]);

    const libTheme: OverridableStringUnion<"primary" | "secondary" | "error" | "warning" | "success" | "transparent", AppBarPropsColorOverrides> = useMemo(() => {
        switch (themeColor) {
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
        libTheme
    };
}
