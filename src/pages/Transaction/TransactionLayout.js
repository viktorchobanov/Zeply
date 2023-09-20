import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import { AppContext } from '../../Context/AppContext';

import { convertDate } from '../../utils';

function TransactionLayout({ transactionData, transactionStatus }) {
    const {
        selectedCurrency,
        convertValue
    } = useContext(AppContext);

    return (
        <Card style={{ padding: '20px' }}>
            <Typography variant="h6">Transaction Hash: {transactionData.hash}</Typography>
            <Typography variant="body1">Received Time: {convertDate(transactionData.time)}</Typography>
            <Typography variant="body1">Status: {transactionStatus}</Typography>
            <Typography variant="body1">Size: {transactionData.size} bytes</Typography>
            <Typography variant="body1">Confirmations: {transactionData.block_height}</Typography>
            <Typography variant="body1">Total BTC input: {convertValue(transactionData.inputs[0].prev_out.value, selectedCurrency)} {selectedCurrency}</Typography>
            <Typography variant="body1">Total BTC output: {convertValue(transactionData.out.reduce((acc, output) => acc + output.value, 0), selectedCurrency)} {selectedCurrency}</Typography>
            <Typography variant="body1">Total Fees: {convertValue(transactionData.fee, selectedCurrency)} {selectedCurrency}</Typography>
        </Card>
    );
}

export default TransactionLayout;
