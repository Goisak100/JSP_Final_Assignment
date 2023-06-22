import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { Container, Box, Typography, Paper } from '@mui/material';

export default function OrderDetail() {
    const location = useLocation();
    const orderId = location?.state?.data?.orderId;
    const [orderDetails, setOrderDetails] = useState([]);
    const [userInformations, setUserInformations] = useState({});

    useEffect(() => {
        const config = {
            params: {
                orderId: orderId,
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }

        const fetchOrderDetails = async() => {
            try {
                const response = await axios.post("https://isakgo.com:8443/api/getOrderDetails", null, config)
                setOrderDetails(response.data);
                return response;
            } catch(error) {
                console.log(error);
            }
        }

        const fetchUserInformations = async() => {
            try {
                const response = await axios.post("https://isakgo.com:8443/api/getUserInformationByOrderId", null, config)
                setUserInformations(response.data);
                return response;
            } catch(error) {
                console.log(error);
            }
        }

        const fetchAll = async() => {
            await fetchOrderDetails();
            await fetchUserInformations();
        }

        fetchAll();
    }, [])

    return (
        <Container>
            <Typography variant="h2">Order detail 페이지입니다.</Typography>
            <Box mt={4}>
                <Typography variant="h4">주문 물품</Typography>
                {orderDetails.map((item, index) => {
                    return (
                        <Paper key={index} elevation={3} sx={{p: 2, mt: 1}}>
                            <Typography>책 제목: {item.name}, 저자: {item.author}, 역자: {item.translator}, 가격: {item.price}, 수량: {item.quantity}</Typography>
                        </Paper>
                    );
                })}
            </Box>
            <Box mt={4}>
                <Typography variant="h4">배송지</Typography>
                <Paper elevation={3} sx={{p: 2, mt: 1}}>
                    <Typography>보낸 사람: {userInformations.userId}</Typography>
                    <Typography>주소: {userInformations.address}, {userInformations.addressDetail}</Typography>
                    <Typography>휴대전화: {userInformations.phoneNumber}</Typography>
                </Paper>
            </Box>
        </Container>
    )
}