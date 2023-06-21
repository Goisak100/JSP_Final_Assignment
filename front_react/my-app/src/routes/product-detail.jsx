import React from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, Typography, Button, Link } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledCardMedia = styled(CardMedia)({
  width: '400px',
  height: '600px',
  marginRight: '20px',
});

const StyledCardMediaContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const loader = async ({params}) => {
  try {
    const response = await axios.get("https://158.247.246.106:8080/api/book/getBookDetail", {
      params: {
        id: params.id
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default function ProductDetail() {
  const book = useLoaderData();
  const { id, name, author, translator, publisher, publicationDate, price, imageUrl, introduce } = book;
  const role = sessionStorage.getItem("role");

  const navigate = useNavigate();

  const handleRemoveBook = async () => {
    try {
        await axios.post("https://158.247.246.106:8080/api/book/removeBook", null, {
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

  const handlePutInCart = async () => {

    // 원래는 토큰을 서버로 보내서 유효성을 검사하고, 올바르지 않을 때만 진행해야 한다.
    if (!sessionStorage.getItem("token")) {
      if (window.confirm("카트에 담으려면 로그인을 하셔야 합니다. 로그인 페이지로 이동합니까?")) {
        navigate("/RootLogin/Login");
      } else {
        return;
      }
    }

    try {
      await axios.post("https://158.247.246.106:8080/api/addBookToCart", null, {
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

  return (
    <StyledCard>
      <StyledCardMediaContainer>
        <StyledCardMedia image={imageUrl} alt="Product의 물품입니다." />
      </StyledCardMediaContainer>
      <StyledCardContent>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {author} 지음, {translator} 옮김, {publisher} 출판, {publicationDate}
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            {price} 원
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {introduce.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
            ))}
          </Typography>
          <Button variant="contained" color="primary" onClick={handlePutInCart}>
            카트에 담기
          </Button>
          {role === "admin" && <Button variant="contained" color="primary" onClick={handleUpdateBook}>상품 수정하기</Button>}
          {role === "admin" && <Button variant="contained" color="primary" onClick={handleRemoveBook}>상품 삭제하기</Button>}
        </CardContent>
      </StyledCardContent>
    </StyledCard>
  );
}