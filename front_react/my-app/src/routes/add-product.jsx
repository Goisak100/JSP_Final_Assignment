import axios from "axios";
import { useState } from "react";
import { Container, Box, TextField, Button, Typography } from '@mui/material';


export default function AddProduct() {

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [translator, setTranslator] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [image, setImage] = useState();

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value);
    }

    const handleChangeTranslator = (event) => {
        setTranslator(event.target.value);
    }

    const handleChangePublisher = (event) => {
        setPublisher(event.target.value);
    }

    const handleChangePublicationDate = (event) => {
        setPublicationDate(event.target.value);
    }

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleChangeImageUrl = (event) => {
        const file = event.target.files[0];
        setImageUrl(file.name);
        setImage(file);
    }

    const handleChangeIntroduce = (event) => {
        setIntroduce(event.target.value);
    }

    const sendQuery = async () => {
        try {
            const formData = new FormData();
    
            formData.append("image", image);
            formData.append("name", name);
            formData.append("author", author);
            formData.append("translator", translator);
            formData.append("publisher", publisher);
            formData.append("publicationDate", publicationDate);
            formData.append("price", price);
            formData.append("imageUrl", imageUrl);
            formData.append("introduce", introduce);
    
            await axios.post("https://isakgo.com/api/book/addBook", formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            window.location.href = "/Products";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Typography variant="h2">AddProduct 페이지입니다.</Typography>
            <Box component="form" mt={2}>
                <TextField label="제목" value={name} onChange={handleChangeName} variant="outlined" fullWidth margin="normal"/>
                <TextField label="저자" value={author} onChange={handleChangeAuthor} variant="outlined" fullWidth margin="normal"/>
                <TextField label="역자" value={translator} onChange={handleChangeTranslator} variant="outlined" fullWidth margin="normal"/>
                <TextField label="출판사" value={publisher} onChange={handleChangePublisher} variant="outlined" fullWidth margin="normal"/>
                <TextField label="출판일" value={publicationDate} onChange={handleChangePublicationDate} variant="outlined" fullWidth margin="normal"/>
                <TextField label="가격" value={price} onChange={handleChangePrice} variant="outlined" fullWidth margin="normal"/>
                <TextField label="이미지Url" type="file" onChange={handleChangeImageUrl} variant="outlined" fullWidth margin="normal"/>
                <TextField label="책소개" value={introduce} onChange={handleChangeIntroduce} variant="outlined" fullWidth margin="normal"/>
                <Button variant="contained" onClick={sendQuery}>등록하기</Button>
            </Box>
            <Button variant="contained" color="secondary" mt={2}>테스트 값 채우기</Button>
        </Container>
    )
}