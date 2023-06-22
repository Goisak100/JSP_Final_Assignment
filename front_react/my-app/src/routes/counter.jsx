import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, Typography, Button, Link, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const action = () => {
  console.log("test");
}

export default function Counter({item_id, currentCount}) {
    const [count, setCount] = useState(currentCount);
    
    const handleIncrement = () => {
        setCount(prevState => prevState + 1);
    }

    const handleDecrement = () => {
        if (count - 1 === 0) {
            return;
        }
        setCount(prevState => prevState - 1);
    }

    const sendQuery = async () => {
        try {
            await axios.post("https://isakgo.com:8443/api/updateQuantityByCount", null, {
                params: {
                    item_id: item_id,
                    count: count,
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            window.location.href = "/Shopping-cart";
            console.log("장바구니 개수 수정 완료!");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField variant="outlined" size="small" value={count} InputProps={{ readOnly: true }} />
            <Button variant="contained" color="secondary" style={{ color: 'white' }} onClick={handleIncrement}>
                증가
            </Button>
            <Button variant="contained" color="secondary" style={{ color: 'white' }} onClick={handleDecrement}>
                감소
            </Button>
            <Button variant="contained" color="primary" style={{ color: 'white' }} onClick={sendQuery}>
                변경
            </Button>
        </Box>
    );
}
