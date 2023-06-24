import React from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const StyledCardMedia = styled(CardMedia)({
  width: '200px',
  height: '300px',
  marginRight: '20px',
});

export const action = () => {
  console.log("test");
}

export default function Product({ book }) {
  const { id, name, author, translator, publisher, publicationDate, price, imageUrl } = book;
  const role = sessionStorage.getItem("role");
  
  const navigate = useNavigate();

  const handlePutInCart = async () => {

    if (!sessionStorage.getItem("token")) {
      if (window.confirm("카트에 담으려면 로그인을 하셔야 합니다. 로그인 페이지로 이동합니까?")) {
        navigate("/RootLogin/Login");
      } else {
        return;
      }
    }

    try {
      await axios.post("${process.env.REACT_APP_SERVER_HOST}/api/addBookToCart", null, {
        params: {
          book_id: id,
          quantity: 1,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      })

      if (window.confirm("카트에 담겼습니다. 확인하시겠습니까?")) {
        navigate("/Shopping-cart");
      } else {
        return;
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveBook = async () => {
    try {
        await axios.post("${process.env.REACT_APP_SERVER_HOST}/api/book/removeBook", null, {
          params: {
            book_id: id,
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }
        });
        window.location.href = "/Products";
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateBook = () => {
    navigate("/Update-product", { state: { book }});
  }

  return (
    <StyledCard>
      <Link to={`/Product-detail/${id}`}>
        <StyledCardMedia image={imageUrl} alt="Product의 물품입니다." onClick={() => navigate(`/Product-detail/${id}`)}/>
      </Link>
      <CardContent>
        <Link to={`/Product-detail/${id}`}>
          <Typography variant="h5" component="h2" gutterBottom onClick={() => navigate(`/Product-detail/${id}`)}>
            {name}
          </Typography>
        </Link>
        <Typography color="textSecondary" gutterBottom>
          {author} 지음, {translator} 옮김, {publisher} 출판, {publicationDate}
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          {price} 원
        </Typography>
        <Button variant="contained" color="primary" onClick={handlePutInCart}>
          카트에 담기
        </Button>
        {role === "admin" && <Button variant="contained" color="primary" onClick={handleUpdateBook}>상품 수정하기</Button>}
        {role === "admin" && <Button variant="contained" color="primary" onClick={handleRemoveBook}>상품 삭제하기</Button>}
      </CardContent>
    </StyledCard>
  );
}
