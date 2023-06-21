import axios from "axios"
import { useEffect, useState } from "react"
import Counter from "./counter";
import DeleteButton from "./delete-button";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(2),
  }));
  
  const StyledCardMedia = styled(CardMedia)({
    width: '120px',
    height: '180px',
    marginRight: '20px',
  });

export default function ShoppingCart() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        const element = document.getElementById("address_kakao");

        const handleClick = () => {
            new window.daum.Postcode({
                oncomplete: function(data) {
                    setAddress(data.address);
                }
            }).open();
        }

        if (element) {
            element.addEventListener('click', handleClick);
        }

        return () => {
            if (element) {
                element.removeEventListener('click', handleClick);
            }
        }
    }, [])

    const handleChangeAddressDetail = (event) => {
        setAddressDetail(event.target.value);
    }

    const handleChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get("https://158.247.246.106:8080/api/findCartDetailById", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                })
                setData(response.data);
                return response;
            }
            catch (error) {
                console.log(error);
            }
        }

        const fetchTotalPrice = async() => {
            try {
                const response = await axios.post("https://158.247.246.106:8080/api/totalPrice", null, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                })
                setTotalPrice(response.data);
                return response;
            } catch (error) {
                console.log(error);
            }
        }

        const fetchUserInformationData = async() => {
            try {
                const response = await axios.post("https://158.247.246.106:8080/api/findUserInformationById", null, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                })
                const userInformation = response.data;
                setName(userInformation.userId);
                setAddress(userInformation.address);
                setAddressDetail(userInformation.addressDetail);
                setPhoneNumber(userInformation.phoneNumber);
                return response;
            } catch(error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        console.log("에러가 발생했지만, 404는 의도된 동작입니다.")
                    } else {
                        console.log(error);
                    }
                }
            }
        }

        const fetchAll = async () => {
            await fetchData();
            await fetchTotalPrice();
            await fetchUserInformationData();
        }

        fetchAll();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const result = window.confirm("주문하시겠습니까?");
        if (result) {
            navigate("/Order-fulfillment", {state: { data: {
                address: address,
                addressDetail: addressDetail,
                phoneNumber: phoneNumber,
            }}});
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h2" component="div">
                장바구니
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {data.map(item => (
                    <StyledCard key={item.id}>
                        <StyledCardMedia
                            image={item.imageUrl}
                            title={item.name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.price * item.quantity}</Typography>
                            <Counter item_id={item.id} currentCount={item.quantity}/>
                            <DeleteButton item_id={item.id}/>
                        </CardContent>
                    </StyledCard>
                ))}
            </Box>
            <Typography variant="h2" component="div">
                합계: {totalPrice}
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h2" component="div">
                    배송지
                </Typography>
                <TextField fullWidth label="이름" value={name} InputProps={{ readOnly: true }}/>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <TextField fullWidth label="받는 주소" value={address} InputProps={{ readOnly: true }}/>
                    <Button id="address_kakao" variant="contained" >검색</Button>
                </Box>
                <TextField fullWidth label="상세주소" value={addressDetail} onChange={handleChangeAddressDetail}/>
                <TextField fullWidth label="휴대전화" value={phoneNumber} onChange={handleChangePhoneNumber} />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSubmit}>주문하기</Button>
                </Box>
            </Box>
        </Box>
    )
}