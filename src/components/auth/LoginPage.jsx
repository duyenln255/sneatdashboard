import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import config from '../../configs/config';
import { useDispatch } from 'react-redux';
import { setUserData, setToken, setEmail } from '../../redux/reducers/userSlice';
import LoadingOverlay from '../LoadingOverlay'; // Import the LoadingOverlay component

const LoginPage = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleLogin = async () => {
    setErrorMessage(''); // Clear any previous error message
    setLoading(true); // Set loading to true

    if (!email.includes('@')) {
      setErrorMessage('Invalid email format');
      setLoading(false); // Set loading to false if error
      return;
    }

    if (!recaptchaValue) {
      setErrorMessage('Please complete the reCAPTCHA');
      setLoading(false); // Set loading to false if error
      return;
    }

    try {
      const response = await axios.post(`${config.apiUrl}/users/authen`, {
        email: email,
        pw_hash: password,
        recaptcha: recaptchaValue // Thêm reCAPTCHA giá trị vào payload nếu cần thiết
      });

      if (response.status === 200 && response.data) {
        const { token, ...userData } = response.data.data; // Adjust based on actual response structure
        localStorage.setItem('token', token);

        dispatch(setUserData(userData));
        dispatch(setToken(token));
        dispatch(setEmail(email));

        setAuthenticated(true);
        navigate('/');
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(/assets/background.png)`,
        backgroundSize: 'cover',
      }}
    >
      {loading ? ( 
        <LoadingOverlay /> // Use the LoadingOverlay component
      ) : (
        <Box
          sx={{
            width: '450px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box display="flex" justifyContent="center" mb={3}>
            <Box
              component="img"
              src="/assets/logo.svg"
              alt="Logo"
              sx={{ width: 80, height: 80, objectFit: 'contain' }}
            />
          </Box>
          <Typography variant="h4" align="center" gutterBottom style={{ color: '#76569a' }}>Sneat</Typography>
          <Typography variant="subtitle1" align="center" gutterBottom style={{ color: '#76569a' }}>Nhập email và mật khẩu để đăng nhập</Typography>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmailState(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#76569a' } }}
            inputProps={{ style: { color: '#76569a', backgroundColor: 'rgba(255, 255, 255, 0.9)' } }}
            error={email && !email.includes('@')}
            helperText={email && !email.includes('@') ? 'Invalid email format' : ''}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#76569a' } }}
            inputProps={{ style: { color: '#76569a', backgroundColor: 'rgba(255, 255, 255, 0.9)' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    sx={{ padding: '0', marginRight: '0', color: '#9265a6' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="center" mb={2} mt={2}>
            <ReCAPTCHA
              sitekey={config.recaptchaSiteKey}
              onChange={handleRecaptchaChange}
            />
          </Box>
          {errorMessage && (
            <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#6352a0', color: '#fff' }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
