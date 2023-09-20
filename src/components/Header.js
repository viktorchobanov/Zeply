import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CurrencySelector from './CurrencySelector';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Bitcoin Explorer
                </Typography>

                <CurrencySelector />
            </Toolbar>
        </AppBar>
    );
}

export default Header;
