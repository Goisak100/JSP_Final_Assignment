import { Box } from "@mui/material"
import Product from "./product"
import axios from "axios"
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
    try {
        const response = await axios.get("https://isakgo.com:8443/api/book/getBook");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default function Products() {

    const books = useLoaderData();

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            
            {books.map(book => {
                return (
                    <Product key={book.id} book={book}/>
                );
            })}
        </Box>
    )
}