export const convertDate = (timestamp) => {
    if (timestamp)
        return new Date(timestamp * 1000).toLocaleString();
}

export function getTransactionStatus(transactionData) {
    const confirmations = transactionData.confirmations;
    const blockHeight = transactionData.block_height;
    const currentTime = Math.floor(Date.now() / 1000); // Current UNIX timestamp

    if (confirmations === 0) {
        // Unconfirmed or pending (check if it has a non-zero time value)
        if (transactionData.time > 0) {
            return 'Unconfirmed'; // Pending
        } else {
            return 'Unconfirmed'; // Unconfirmed
        }
    } else if (confirmations < 6) {
        // Pending (has some confirmations, but less than 6)
        return 'Pending';
    } else {
        // Confirmed (has 6 or more confirmations)
        return 'Confirmed';
    }
}