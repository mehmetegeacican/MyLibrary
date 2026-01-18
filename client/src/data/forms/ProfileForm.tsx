import { Avatar, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '../../hooks/contextHooks'
import { VisibilityOff, Visibility, Person } from '@mui/icons-material';
import { useLibraryTheme } from '../../hooks/theme/useLibraryTheme';
import UploadButton from '../../components/buttons/uploadButton';
import { getUserById, updateUser } from '../../apis/userApis';
import { useDebounce } from '../../hooks/asyncHooks/useDebounce';
import { Image, message } from 'antd';
import { postNewImage } from '../../apis/imageApis';




export default function ProfileForm() {
  const { user , dispatch } = useAuthContext();
  const { libTheme } = useLibraryTheme();
  // Variables
  const [username, setUsername] = useState(user?.email || "");
  //const [debouncedUsername, setDebouncedUsername] = useState(user?.email || '');

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  // Upload
  const [imagePath, setImagePath] = React.useState<string>(user?.imagePath || "");
  const [uploadedPicture, setUploadedPicture] = React.useState<File | null>(null);

  // Handlers

  // Use debounce to delay the update of debouncedUsername
  const debounceUsername = useDebounce(async (value: string) => {
    //setDebouncedUsername(value);
    if (user?.id) {
      try {
        // Update the username via API
        await updateUser(user?.id.toString(), { username: value }, user?.token);

        // Update username in localStorage
        const updatedUser = { ...user, email: value };
        dispatch({type:'LOGIN', payload:updatedUser});
        // For Local Storage
        localStorage.setItem('user',JSON.stringify(updatedUser));
        message.success('Username changed successfully');
      } catch (error) {
        console.error("Failed to update user:", error);
        message.error('Error occured! Could not change the username');
      }
    }
  }, 4000);

  // Use debounce for Password Change as well
  const debouncePassword = useDebounce(async (value:string) => {
    if (user?.id) {
      try {
        // Update the username via API
        await updateUser(user?.id.toString(), { username: user.email,password:value }, user?.token);
        message.success('Password changed successfully');
      } catch (error) {
        console.error("Failed to update password:", error);
        message.error('Error occured! Could not change the password');
      }
    }
  },4000);

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

  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    debouncePassword(value);
  }

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

  /**
   * Initial Fetch to Get the User
   */
  useEffect(() => {
    const fetchUserData = async () => {
      if(user){
        const res = await getUserById(user?.id.toString(),user?.token);
        if(res.imagePath){
          setImagePath(res.imagePath);
        }
        if(res.password){
          setPassword(res.password);
        }
      }
    }
    fetchUserData();
  },[]);


  // Update imagePath dynamically
  useEffect(() => {
    if (imagePath && uploadedPicture && user?.id) {
      const updateProfilePicture = async () => {
        try {
          // Step 1 -- Update the User Info
          await updateUser(user.id.toString(), { imagePath: imagePath }, user.token);
          // Step 2 -- Add the Image
          let formData = new FormData();
          formData.append('location', 'profilepics');
          formData.append('image', uploadedPicture);
          await postNewImage(formData, user!.token);

          const updatedUser = { ...user, imagePath: imagePath };
          dispatch({type:'LOGIN', payload:updatedUser});

          localStorage.setItem('user',JSON.stringify(updatedUser));

          // Step 3 -- Deliver Success Message
          message.success('Profile picture updated successfully!');
        } catch (error) {
          console.error("Failed to update profile picture:", error);
          message.error('Error occurred! Could not update the profile picture.');
        }
      };
      updateProfilePicture();
    }
  }, [imagePath]);

  return (
    <Stack direction={'row'} spacing={7} alignItems={'center'} justifyContent={'space-between'}>
      <Avatar sx={{
        height: 200,
        width: 200,
        backgroundColor: avatarColor,
        transition: '0.3s ease'
      }}>
        {!imagePath && <Person sx={{ height: 90, width: 90 }} />}
        {imagePath && <Image src={`http://localhost:4008/images/profilepics/${imagePath}`} height={200} width={200}/>}
      </Avatar>
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
            disabled={true}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={() => console.log("password change is unavailable")}
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <UploadButton
            title='Upload Profile Picture'
            imageFile={uploadedPicture}
            setImageFile={setUploadedPicture}
            imagePath={imagePath}
            setImagePath={setImagePath}
          />
        </div>
      </Stack>
    </Stack>
  )
}
