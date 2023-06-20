import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
    return (
        <div>
            <Box sx={{bgcolor: '#f5f5f5', p: 2}}>
                <Typography variant="body2" align="center">
                    &copy; {new Date().getFullYear()} My Website
                </Typography>
                <Typography variant="body2" align="center">
                    <Link color="textPrimary" href="mailto:goisak100@naver.com">
                        goisak100@naver.com
                    </Link>
                </Typography>
            </Box>
        </div>
    )
}