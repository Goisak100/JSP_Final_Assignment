import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Container, Typography } from '@mui/material';


export default function UserInformationManagement() {

    const navigate = useNavigate();

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
                element.removeEventListener('click', handleClick)
            }
        }
    }, [])

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeAddressDetail = (event) => {
        setAddressDetail(event.target.value);
    }

    const handleChangePhoneNumber = (event) => {
        // 여기에서 숫자만 입력되게
        // 휴대폰 형식으로 입력되게
        // 최대 길이 제한 xxx-xxxx-xxxx
        setPhoneNumber(event.target.value);
    }

    const handleCancle = (event) => {
        event.preventDefault();
        navigate("/");
    }

    const handleUpdateUserInforamtion = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://158.247.246.106:8080/api/updateUserInformationById", null, {
                params: {
                    address: address,
                    addressDetail: addressDetail,
                    phoneNumber: phoneNumber,
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            })
            window.location.href = "/User-information-management";
        } catch(error) {
            console.log(error);
        }        
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.post("http://158.247.246.106:8080/api/findUserInformationById", null, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                })
                const userInformation = response.data;
                setName(userInformation.userId);
                setAddress(userInformation.address);
                setAddressDetail(userInformation.addressDetail);
                setPhoneNumber(userInformation.phoneNumber);
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

        fetchData();
    }, [])

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center">사용자 정보 수정</Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                <TextField fullWidth label="이름" value={name} onChange={handleChangeName} />
                <TextField fullWidth label="주소" id="address_kakao" value={address} InputProps={{ readOnly: true }} />
                <TextField fullWidth label="상세주소" name="address_detail" value={addressDetail} onChange={handleChangeAddressDetail} />
                <TextField fullWidth label="전화번호" value={phoneNumber} onChange={handleChangePhoneNumber} />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="secondary" onClick={handleCancle}>취소</Button>
                    <Button variant="contained" onClick={handleUpdateUserInforamtion}>수정하기</Button>
                </Box>
            </Box>
        </Container>
    );
}