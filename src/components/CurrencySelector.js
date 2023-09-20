import React, { useContext } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

import { AppContext } from '../Context/AppContext';

function CurrencySelector() {
    const { selectedCurrency, setSelectedCurrency } = useContext(AppContext);

    const handleChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    return (
        <div>
            <Select
                label="Select Currency"
                value={selectedCurrency}
                onChange={handleChange}
                color='primary'
            >
                <MenuItem value="BTC">
                    <CurrencyBitcoinIcon /> BTC
                </MenuItem>
                <MenuItem value="USD">
                    <AttachMoneyIcon /> USD
                </MenuItem>
                <MenuItem value="EUR">
                    <EuroIcon /> EUR
                </MenuItem>
            </Select>
        </div>
    );
}

export default CurrencySelector;
