import React, { useContext } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

import { convertDate } from '../../utils';

import { AppContext } from '../../Context/AppContext';

function AddressLayout({ addressData }) {
    const {
        convertValue,
        selectedCurrency
    } = useContext(AppContext);

    if (!addressData.address) {
        return null;
    }

    return (
        <Card>
            <Typography variant="h6">Address: {addressData.address}</Typography>
            <Typography variant="body1">Final Balance: {convertValue(addressData.final_balance, selectedCurrency)} {selectedCurrency}</Typography>
            <Typography variant="body1">Total Received: {convertValue(addressData.total_received, selectedCurrency)} {selectedCurrency}</Typography>
            <Typography variant="body1">Total Sent: {convertValue(addressData.total_sent, selectedCurrency)} {selectedCurrency}</Typography>
            <Typography variant="body1">Number of Transactions: {addressData.n_tx}</Typography>
        </Card>
    );
}

export default AddressLayout;
