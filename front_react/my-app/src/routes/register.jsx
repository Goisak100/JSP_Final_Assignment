import axios from "axios";
import { useState } from "react";
import React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Register() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeId = (event) => {
        setId(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRegister = async () => {
        const body = {
            id: id,
            password: password,
        }

        try {
            await axios.post("http://localhost:8080/api/processRegister", body);
            window.location.href ="/RootLogin/Login";
            console.log("회원가입이 완려되었습니다.");
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
                    회원가입 페이지입니다.
                </Typography>
                <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
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
                        회원가입
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}