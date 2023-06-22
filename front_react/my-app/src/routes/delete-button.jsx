import { Box, Button } from "@mui/material";
import axios from "axios"

export default function DeleteButton({item_id}) {

    const sendQuery = async () => {
        
        try {
            await axios.post("https://isakgo.com/api/deleteCartById", null, {
                params: {
                    item_id: item_id,
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            window.location.href = "/Shopping-cart";
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" style={{color: 'white'}} onClick={sendQuery}>
                삭제하기
            </Button>
        </Box>
    )
}