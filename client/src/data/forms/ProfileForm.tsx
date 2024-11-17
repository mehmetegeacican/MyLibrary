import { Avatar, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, Button } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useAuthContext } from '../../hooks/contextHooks/useAuthContext'
import PersonIcon from '@mui/icons-material/Person';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import UploadButton from '../../components/buttons/uploadButton';
import { updateUser } from '../../apis/userApis';
import { useDebounce } from '../../hooks/asyncHooks/useDebounce';
import { message } from 'antd';




export default function ProfileForm() {
  const { user } = useAuthContext();
  const { libTheme } = useLibraryTheme();
  // Variables
  const [username, setUsername] = useState(user?.email || "");
  const [debouncedUsername, setDebouncedUsername] = useState(user?.email || '');

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  // Handlers

  // Use debounce to delay the update of debouncedUsername
  const debounceUsername = useDebounce(async (value: string) => {
    setDebouncedUsername(value);
    if (user?.id) {
      try {
        // Update the username via API
        await updateUser(user?.id.toString(), { username: value }, user?.token);

        // Update username in localStorage
        const updatedUser = { ...user, email: value };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        message.success('Username changed successfully!');
      } catch (error) {
        console.error("Failed to update user:", error);
        message.error('Error occured! Could not change the username');
      }
    }
  }, 4000);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    debounceUsername(value);
  };

  const avatarColor = useMemo(() => {
    switch (libTheme) {
      case 'primary':
        return '#2196f3';
      case 'secondary':
        return '#9c27b0';
      case 'success':
        return '#4caf50';
      case 'error':
        return '#c62828';
      case 'warning':
        return '#ff6f00';
      default:
        return 'blueviolet'
    }
  }, [libTheme]);


  return (
    <Stack direction={'row'} spacing={7} alignItems={'center'} justifyContent={'space-between'}>
      <Avatar sx={{
        height: 200,
        width: 200,
        backgroundColor: avatarColor,
        transition: '0.3s ease'
      }}> <PersonIcon sx={{ height: 90, width: 90 }} /> </Avatar>
      <Stack spacing={3} sx={{
        width: '83%'
      }} >
        <FormControl variant='standard'>
          <InputLabel htmlFor="standard-adornment-password" color={libTheme}>Username</InputLabel>
          <Input
            id="standard-adornment-username"
            color={libTheme}
            value={username}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password" color={libTheme}>Password</InputLabel>
          <Input
            id="standard-adornment-password"
            color={libTheme}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <UploadButton title='Upload Profile Picture' />
      </Stack>

    </Stack>
  )
}
