import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, Box, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function HeaderLogin() {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowUserInformation = () => {
    handleClose();
    navigate("/User-information-management");
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    handleClose();
    window.location.href = "/";
  }

  const handleOrderList = () => {
    handleClose();
    navigate("/Order-list");
  }


  const open = Boolean(anchorEl);

  const role = sessionStorage.getItem("role");

  return (
    <AppBar position='static'>
        <Toolbar>
            <Box sx={{flexGrow: 1}}>
              <Link to="/"><Button>Home</Button></Link>
              <Link to="/Products"><Button>상품목록</Button></Link>
              <Link to="/Shopping-cart"><Button>장바구니</Button></Link>
              {role === "admin" && <Link to="/Add-product"><Button>상품등록</Button></Link>}
            </Box>
            <Box>
              <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
              >
                  Dashboard
              </Button>
              <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                  }}
              >
                  <MenuItem onClick={handleOrderList}>주문내역</MenuItem>
                  <MenuItem onClick={handleShowUserInformation}>회원정보관리</MenuItem>
                  <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </Menu>
            </Box>
      </Toolbar>
    </AppBar>
  );
}