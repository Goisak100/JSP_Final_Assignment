import axios from "axios";
import { useEffect } from "react"
import { useLocation } from "react-router-dom";

export default function OrderFulfillment() {

    const location = useLocation();
    const data = location?.state?.data;

    useEffect(() => {
        const order = async () => {
            try {
                axios.post("http://158.247.246.106:8080/api/order", null, {
                    params: {
                        address: data.address,
                        addressDetail: data.addressDetail,
                        phoneNumber: data.phoneNumber,
                    },
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }

        order();
    }, []);

    return (
        <div>
            <h1>주문이 완료되었습니다.</h1>
            <button onClick={() => { }}>주문내역 확인하기</button>
        </div>
    )
}

// 주문 내역 페이지에 들어가면, 주문 목록을 가져온다.

// 각 주문 목록을 선택하면, 각 주문에 관한 상세를 가져온다.