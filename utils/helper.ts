export function calculateTokens(solAmount, solPrice) {
    // Current exchange rates
    const solToUSD = solPrice; // 1 SOL = $148
    const tokenPrice = 0.0001; // 1 MGTK = $0.0001

    // Convert SOL to USD
    const usdAmount = solAmount * solToUSD;

    // Calculate the amount of tokens
    const tokenAmount = usdAmount / tokenPrice;

    return tokenAmount.toFixed(8);
}
