import { convertDate, convertSatoshiToBTC, getTransactionStatus } from './index';

describe('Bitcoin Explorer Utility Functions', () => {
    describe('convertDate', () => {
        it('should convert timestamp to a formatted date string', () => {
            const timestamp = new Date();
            const formattedDate = convertDate(timestamp);
            console.log(formattedDate)
            expect(formattedDate).toMatch(/\d{1,2}\/\d{1,2}\/\d{1,5}, \d{1,2}:\d{2}:\d{2} [APap][Mm]/); // Check if it matches a date-time format
        });

        it('should return undefined for invalid timestamp', () => {
            const timestamp = undefined;
            const formattedDate = convertDate(timestamp);
            expect(formattedDate).toBeUndefined();
        });
    });

    describe('convertSatoshiToBTC', () => {
        it('should convert satoshis to BTC', () => {
            const satoshis = 100000000; // 1 BTC in satoshis
            const btc = convertSatoshiToBTC(satoshis);
            expect(btc).toBe(1);
        });

        it('should return undefined for invalid satoshis', () => {
            const satoshis = undefined;
            const btc = convertSatoshiToBTC(satoshis);
            expect(btc).toBeUndefined();
        });
    });

    describe('getTransactionStatus', () => {
        it('should return "Unconfirmed" for a transaction with 0 confirmations and a non-zero time', () => {
            const transactionData = { confirmations: 0, time: 1631545927 };
            const status = getTransactionStatus(transactionData);
            expect(status).toBe('Unconfirmed');
        });

        it('should return "Unconfirmed" for a transaction with 0 confirmations and a time of 0', () => {
            const transactionData = { confirmations: 0, time: 0 };
            const status = getTransactionStatus(transactionData);
            expect(status).toBe('Unconfirmed');
        });

        it('should return "Pending" for a transaction with fewer than 6 confirmations', () => {
            const transactionData = { confirmations: 5 };
            const status = getTransactionStatus(transactionData);
            expect(status).toBe('Pending');
        });

        it('should return "Confirmed" for a transaction with 6 or more confirmations', () => {
            const transactionData = { confirmations: 6 };
            const status = getTransactionStatus(transactionData);
            expect(status).toBe('Confirmed');
        });
    });
});
