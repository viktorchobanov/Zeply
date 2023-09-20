import React, { useState, useContext } from 'react';
import { Paper, Typography, Button, TextField, Grid, List, ListItem, ListItemText } from '@mui/material';

import Toast from '../../components/Toast';

import AddressLayout from '../Address/AddressLayout';
import TransactionLayout from '../Transaction/TransactionLayout';

import TransactionService from '../../services/transaction.service';

import { getTransactionStatus } from '../../utils';

import { AppContext } from '../../Context/AppContext';

function ExplorerLayout() {
    const [addressData, setAddressData] = useState({});
    const [transactionData, setTransactionData] = useState({});

    const [transactionStatus, setTransactionStatus] = useState('');

    const {
        address,
        setAddress,
        transactionHash,
        setTransactionHash,
        subscribeToHash,
        notifications,
        openSnackbar,
        setOpenSnackbar,
        snackbarMessage,
        severity,
    } = useContext(AppContext);

    const getAddressData = async () => {
        if (address) {
            const data = await TransactionService.fetchAddressInfo(address);

            setAddressData(data);
        }
    }

    const getTransactionData = async () => {
        if (transactionHash) {
            const data = await TransactionService.fetchTransactionInfo(transactionHash);

            setTransactionData(data)

            const status = getTransactionStatus(data)
            setTransactionStatus(status)
        }
    }

    const handleClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: '1rem' }}
        >
            <Grid item xs={10} sm={10} md={8} lg={5}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h5" textAlign='center' gutterBottom>
                        Search Address Data
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        display="flex"
                        alignItems="center"
                    >
                        <Grid item sm={9}>
                            <TextField
                                label="Bitcoin Address"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>

                        <Grid item sm={3}>
                            <Button variant="contained" onClick={getAddressData}>
                                Get Address Info
                            </Button>
                        </Grid>

                    </Grid>

                    {addressData && (
                        <AddressLayout addressData={addressData} />
                    )}

                </Paper>
            </Grid>

            <Grid item xs={10} sm={10} md={8} lg={5}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h5" textAlign='center' gutterBottom>
                        Search Transactions
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        display="flex"
                        alignItems="center"
                        gutterBottom
                    >
                        <Grid item sm={6}>
                            <TextField
                                label="Transaction Hash"
                                fullWidth
                                value={transactionHash}
                                onChange={(e) => setTransactionHash(e.target.value)}
                            />
                        </Grid>

                        <Grid item sm={6}>
                            <Button variant="contained" onClick={getTransactionData}>
                                Get Transaction
                            </Button>

                            <Button variant="contained" onClick={subscribeToHash}>
                                Subscribe
                            </Button>
                        </Grid>

                    </Grid>

                    {transactionData && transactionData.hash && (
                        <TransactionLayout transactionData={transactionData} transactionStatus={transactionStatus} />
                    )}
                </Paper>
            </Grid>

            <Grid item xs={10} sm={10} md={8} lg={10}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Grid container>
                        <Grid item sm={12} >
                            <Typography variant="h5" gutterBottom>
                                Notifications
                            </Typography>

                            <div style={{ height: '300px', overflowY: 'auto' }}>
                                <List style={{
                                    overflowY: 'auto'
                                }}>
                                    {notifications.map((notification, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={notification.type}
                                                secondary={notification.data}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Toast
                open={openSnackbar}
                handleClose={handleClose}
                message={snackbarMessage}
                severity={severity}
            />

        </Grid>
    );
}

export default ExplorerLayout;
