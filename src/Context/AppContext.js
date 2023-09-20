import React, { useState, useEffect } from 'react';
import TransactionService from '../services/transaction.service';

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    // Snackbar Props
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('Notification');
    const [severity, setSeverity] = useState('info');

    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const [address, setAddress] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    const [selectedCurrency, setSelectedCurrency] = useState('BTC');

    const [conversionRates, setConversionRates] = useState({
        BTC: 1, // BTC to BTC (1:1)
        USD: null, // BTC to USD
        EUR: null, // BTC to EUR
    });

    useEffect(() => {
        const fetchRates = async () => {
            const data = await TransactionService.fetchConvertionRates();

            setConversionRates({
                ...conversionRates,
                USD: data.bitcoin.usd,
                EUR: data.bitcoin.eur,
            });
        }

        fetchRates();
    }, []);

    useEffect(() => {
        // Create a new WebSocket client
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);

        // Handle WebSocket connection open event
        ws.onopen = () => {
            console.log('WebSocket connected');

            if (transactionHash) {
                ws.send(JSON.stringify({
                    "op": "addr_sub",
                    "addr": transactionHash
                }));
            }
        };

        // Handle WebSocket message event
        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);

            if (data) {
                const newNotification = {
                    type: 'Unconfirmed Transaction',
                    data: message.data.hash,
                };

                setNotifications((prevNotifications) => [
                    ...prevNotifications,
                    newNotification,
                ]);

                setSnackbarMessage('Unconfirmed Transaction');
                setOpenSnackbar(true);
            }
        };

        // Handle WebSocket connection close event
        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        setSocket(ws);

        // Cleanup WebSocket connection when the component unmounts
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const subscribeToHash = async () => {
        if (socket && transactionHash) {
            socket.send(JSON.stringify({
                "op": "addr_sub",
                "addr": transactionHash
            }));

            // You can test the connection to the socket with Ping
            // socket.send(JSON.stringify({
            //     op: "ping"
            // }))
        }
    }

    const convertValue = (valueInSatoshis, targetCurrency) => {
        const valueInBTC = valueInSatoshis / 100000000;

        if (conversionRates[targetCurrency]) {
            const convertedValue = valueInBTC * conversionRates[targetCurrency];

            if (targetCurrency === 'BTC')
                return convertedValue;

            return typeof convertedValue === 'number' ? convertedValue.toFixed(2) : Number(convertedValue).toFixed(2);
        }
        return null;
    }

    return (
        <AppContext.Provider value={{
            address,
            setAddress,
            transactionHash,
            setTransactionHash,
            selectedCurrency,
            setSelectedCurrency,
            convertValue,
            subscribeToHash,
            notifications,
            openSnackbar,
            setOpenSnackbar,
            snackbarMessage,
            setSnackbarMessage,
            severity,
            setSeverity
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;