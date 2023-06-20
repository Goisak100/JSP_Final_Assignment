import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, Box, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position='static'>
        <Toolbar>
            <Box sx={{flexGrow: 1}}>
              <Link to="/"><Button>Home</Button></Link>
              <Link to="/Products"><Button>상품목록</Button></Link>
              <Link to="/Shopping-cart"><Button>장바구니</Button></Link>
            </Box>
            <Box>
              <Link to="/RootLogin/Login"><Button>로그인</Button></Link>
              <Link to="/RootLogin/Register"><Button>회원가입</Button></Link>
            </Box>
      </Toolbar>
    </AppBar>
  );
}