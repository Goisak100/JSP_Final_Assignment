import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useEffect, useState } from "react";
import HeaderLogin from "./header-login";

export default function Root() {

    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <div>
            {/* { token ? <HeaderLogin /> : <Header />} */}
            <Outlet />
            <Footer />
        </div>
    )
}