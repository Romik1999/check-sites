import React from 'react';
import {Box, List, ListItem} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

const Layout = ({children} : {children:React.ReactNode}) => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        location.pathname === '/login' ? (
        <>
            {children}
        </>
        ) : (
            <>
                <Box className="sidebar">
                    <Box className="logo">
                        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M25.4588 0.5C19.3954 0.547318 13.5448 2.74047 8.94435 6.69052C4.34394 10.6406 1.29111 16.0922 0.327263 22.0787C-0.636585 28.0651 0.550838 34.1995 3.67895 39.3939C6.80706 44.5882 11.6737 48.5069 17.4158 50.455C18.6888 50.692 19.1538 49.901 19.1538 49.221C19.1538 48.611 19.1318 47 19.1188 44.861C12.0368 46.409 10.5418 41.424 10.5418 41.424C9.3858 38.462 7.7148 37.674 7.7148 37.674C5.4008 36.085 7.88681 36.117 7.88681 36.117C8.69543 36.2304 9.46734 36.5275 10.1434 36.9855C10.8194 37.4434 11.3816 38.0501 11.7868 38.759C14.0598 42.675 17.7488 41.545 19.1998 40.888C19.3134 39.5895 19.8869 38.3743 20.8168 37.461C15.1638 36.813 9.2168 34.614 9.2168 24.794C9.17926 22.2493 10.1179 19.787 11.8398 17.913C11.0617 15.7023 11.1506 13.2787 12.0888 11.131C12.0888 11.131 14.2278 10.442 19.0888 13.758C23.2609 12.6072 27.6667 12.6072 31.8388 13.758C36.6998 10.442 38.8388 11.131 38.8388 11.131C39.7776 13.2783 39.8687 15.7013 39.0938 17.913C40.813 19.7888 41.7469 22.2529 41.7028 24.797C41.7028 34.642 35.7508 36.809 30.0798 37.444C30.6878 38.0674 31.1563 38.8129 31.4542 39.6312C31.7521 40.4494 31.8727 41.3216 31.8078 42.19C31.8078 45.618 31.7758 48.382 31.7758 49.221C31.7758 49.907 32.2338 50.705 33.5258 50.452C39.2656 48.4993 44.1286 44.5774 47.2526 39.3814C50.3767 34.1854 51.56 28.0511 50.5929 22.0659C49.6257 16.0807 46.5705 10.6312 41.9688 6.68368C37.3672 2.73613 31.5165 0.545445 25.4538 0.5H25.4588Z"
                                fill="white"/>
                        </svg>
                        <Box>
                            <Box className="logo__name">Site check</Box>
                            <Box className="logo__text">panel</Box>
                        </Box>
                    </Box>
                    <List>
                        <ListItem onClick={() => navigate('/')}>Home</ListItem>
                        <ListItem onClick={() => navigate('/settings')}>Settings</ListItem>
                        <ListItem onClick={() => navigate('/logs')}>Logs</ListItem>
                        <ListItem onClick={() => navigate('/users')}>Users</ListItem>
                        <ListItem onClick={() => navigate('/login')}>Login</ListItem>
                    </List>
                </Box>
                <Box className="page">
                    <Box className="header"></Box>
                    <Box className="content">
                        {children}
                    </Box>
                </Box>
            </>
        )
    );
};

export default Layout;