import { useEffect, useState } from "react";
import axios from 'axios';

export default function TestLogin() {

    const [token, setToken] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }

        const storedRole = sessionStorage.getItem("role");
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    const handleUserLogin = async () => {
        const body = {
            id: 'test',
            password: '1234'
        }

        try {
            const response = await axios.post("https://158.247.246.106:8443/api/processLogin", body);
            const jsonObject = response.data;
            const token = jsonObject.token;
            const role = jsonObject.role;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("role", role);
            setToken(sessionStorage.getItem("token"));
            setRole(sessionStorage.getItem("role"));
            window.location.href ="/";
        } catch (error) {
            console.log(error);
        }
    }

    const handleAdminLogin = async () => {
        const body = {
            id: 'isakgo',
            password: '1234'
        }

        try {
            const response = await axios.post("https://158.247.246.106:8443/api/processLogin", body);
            const jsonObject = response.data;
            const token = jsonObject.token;
            const role = jsonObject.role;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("role", role);
            setToken(sessionStorage.getItem("token"));
            setRole(sessionStorage.getItem("role"));
            window.location.href ="/";
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        setToken("");
        setRole("");
        window.location.href ="/";
    }

    return (
        <div>
            <div>
                <button onClick={handleAdminLogin}>관리자 로그인하기</button>
                <button onClick={handleUserLogin}>유저 로그인하기</button>
                <button onClick={handleLogout}>로그아웃하기</button>
            </div>
            <div>
                <p>토큰: {token}</p>
                <p>역할: {role}</p>
            </div>
        </div>
    )
}