import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Container, Typography } from "@mui/material";

export default function OrderList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("${process.env.REACT_APP_SERVER_HOST}/api/getAllOrders", null, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
                setData(response.data);
            } catch(error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h2">Order List 페이지입니다.</Typography>
            <List>
            {data.map(item => {
                return (
                    <ListItem key={item.orderId} onClick={
                        () => navigate("/Order-detail", { state: {data: {orderId: item.orderId}}})}>
                        <ListItemText primary={`주문 번호: ${item.orderId} / 사용자 ID: ${item.userId}`} secondary={`제목: ${item.bookName} / 총 가격: ${item.totalPrice} / 책의 종류: ${item.totalQuantity}`} />
                    </ListItem>
                );
            })}
            </List>
        </Container>
    )
}
