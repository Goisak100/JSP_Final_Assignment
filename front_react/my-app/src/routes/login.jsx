import axios from "axios";
import { useState } from "react";
import React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const action = async ({request}) => {

    const formData = await request.formData();

    const body = {
        id: formData.id,
        password: formData.password
    }

    return null;
}

export default function Login() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeId = (event) => {
        setId(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        
        const body = {
            id: id,
            password: password,
        }

        try {
            const response = await axios.post("http://158.247.246.106:8080/api/processLogin", body);
            const jsonObject = response.data;
            const token = jsonObject.token;
            const role = jsonObject.role;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("role", role);
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box 
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    로그인 페이지입니다.
                </Typography>
                <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="ID"
                        name="id"
                        autoComplete="id"
                        autoFocus
                        value={id}
                        onChange={handleChangeId}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        로그인
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}