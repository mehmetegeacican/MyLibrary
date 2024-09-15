import { AppBarPropsColorOverrides, Avatar, Button, FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, styled, TextField } from '@mui/material'
import React, { useMemo } from 'react'
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext'
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';



export default function ProfileForm() {
  const { themeColor , user } = useAuthContext();

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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
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
    <Stack direction={'row'} spacing={7} alignItems={'center'} justifyContent={'space-between'}>
      <Avatar sx={{
        height: 200,
        width: 200,
        backgroundColor: "blueviolet"
      }}> <PersonIcon sx={{ height: 90, width: 90 }} /> </Avatar>
      <Stack spacing={3} sx={{
        width: '83%'
      }} >
        <FormControl variant='standard'>
          <InputLabel htmlFor="standard-adornment-password" color={theme}>Username</InputLabel>
          <Input
            id="standard-adornment-username"
            color={theme}
            value={user?.email ?? ""}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password" color={theme}>Password</InputLabel>
          <Input
            id="standard-adornment-password"
            color={theme}
            type={showPassword ? 'text' : 'password'}
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
        <Button
          component="label"
          variant="contained"
          color={theme}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{
            width: '30%'
          }}
        >
          Upload Profile Picture
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
          />
        </Button>
      </Stack>

    </Stack>
  )
}
