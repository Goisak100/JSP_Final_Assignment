import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography, Container } from '@mui/material';

export default function UpdateProduct() {

    const location = useLocation();
    const [book_id] = useState(location.state?.book?.id);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookDetailData();
    }, []);

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [translator, setTranslator] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [image, setImage] = useState();
    const [localImage, setLocalImage] = useState("");
    const [oldImageUrl, setOldImageUrl] = useState("");

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

        if (file == null) {
            return;
        }

        setLocalImage(URL.createObjectURL(file));
        setImageUrl(file.name);
        setImage(file);
    }

    const handleChangeIntroduce = (event) => {
        setIntroduce(event.target.value);
    }

    const fetchBookDetailData = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/book/getBookDetail`, {
                params: {
                    id: book_id,
                }
            })
            const book = response.data;
            setName(book.name);
            setAuthor(book.author);
            setTranslator(book.translator);
            setPublisher(book.publisher);
            setPublicationDate(book.publicationDate);
            setPrice(book.price);
            const imageUrlTemp = book.imageUrl.slice(book.imageUrl.lastIndexOf("/") + 1);
            setImageUrl(imageUrlTemp);
            setLocalImage(book.imageUrl);
            setIntroduce(book.introduce);
            setOldImageUrl(book.imageUrl);

            const imageResponse = await axios.get(book.imageUrl, {
                responseType: 'blob'
            });

            const file = new File([imageResponse.data], "file");
            setImage(file);
        } catch (error) {
            console.log(error);
        }
    }
        const handleCancle = (event) => {
            event.preventDefault();
            navigate(`/Product-detail/${book_id}`);
        }

    const updateBookDetailData = async(event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("id", book_id);
        formData.append("name", name);
        formData.append("author", author);
        formData.append("translator", translator);
        formData.append("publisher", publisher);
        formData.append("publicationDate", publicationDate);
        formData.append("price", price);
        formData.append("imageUrl", imageUrl);
        formData.append("introduce", introduce);
        formData.append("oldImageUrl", oldImageUrl);

        try {
            await axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/book/updateBookDetail`, formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            window.location.href = `/Product-detail/${book_id}`;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center">UpdateProduct 페이지입니다.</Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}>
                    <img src={localImage} alt="이미지를 출력하는 태그입니다." style={{maxWidth: '100%', maxHeight: '200px'}} />
                    <TextField sx={{ mt: 2 }} type="file" onChange={handleChangeImageUrl} />
                </Box>
                <Box sx={{ width: '30%' }}>
                    <TextField fullWidth label="제목" value={name} onChange={handleChangeName} />
                    <TextField fullWidth label="저자" value={author} onChange={handleChangeAuthor} />
                    <TextField fullWidth label="역자" value={translator} onChange={handleChangeTranslator} />
                    <TextField fullWidth label="출판사" value={publisher} onChange={handleChangePublisher} />
                    <TextField fullWidth label="출판일" value={publicationDate} onChange={handleChangePublicationDate} />
                    <TextField fullWidth label="가격" value={price} onChange={handleChangePrice} />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="secondary" onClick={handleCancle}>취소하기</Button>
                        <Button variant="contained" onClick={updateBookDetailData}>수정하기</Button>
                    </Box>
                </Box>
                <Box sx={{ width: '40%' }}>
                    <TextField fullWidth multiline label="책소개" value={introduce} onChange={handleChangeIntroduce} />
                </Box>
            </Box>
        </Container>
    );
}