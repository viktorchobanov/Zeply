import axios from 'axios';

const fetchAddressInfo = async (address) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_ADDRESS}/rawaddr/${address}`
        );

        return response.data
    } catch (error) {
        console.error('Error fetching address data:', error);
    }
};

const fetchTransactionInfo = async (transactionHash) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_ADDRESS}/rawtx/${transactionHash}`
        );

        return response.data
    } catch (error) {
        console.error('Error fetching transaction data:', error);
    }
};

const fetchConvertionRates = async () => {
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur`
        );

        return response.data
    } catch (error) {
        console.error('Error fetching transaction data:', error);
    }
};

export default {
    fetchAddressInfo,
    fetchTransactionInfo,
    fetchConvertionRates
}