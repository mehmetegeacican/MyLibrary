import { FormControl, IconButton, Input, InputAdornment, InputLabel, Stack } from "@mui/material";
import { useLibraryTheme } from "../../../../hooks/theme/useLibraryTheme";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordModalProps {
    oldPassword:string;
    setOldPassword:Function;
    newPassword:string;
    setNewPassword:Function;
}


export default function ChangePasswordForm({
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword
}:PasswordModalProps) {

    const { libTheme } = useLibraryTheme();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Stack spacing={3} sx={{
            minWidth:400
        }}>
            <FormControl variant='standard'>
                <InputLabel htmlFor="standard-adornment-password" color={libTheme}>Old Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    color={libTheme}
                    disabled={false}
                    type={showPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e:any) => setOldPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>

                        </InputAdornment>
                    }
                />
            </FormControl>
             <FormControl variant='standard'>
                <InputLabel htmlFor="standard-adornment-password" color={libTheme}>New Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    color={libTheme}
                    disabled={false}
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e:any) => {
                        setNewPassword(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>

                        </InputAdornment>
                    }
                />
            </FormControl>
        </Stack>
    )
}
