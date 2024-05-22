export function calculateTokens(solAmount: number, solPrice: number) {
    // Current exchange rates
    if(!solAmount || !solPrice) return 0
    const solToUSD = solPrice; // 1 SOL = $148
    const tokenPrice = 0.0001; // 1 MGTK = $0.0001

    // Convert SOL to USD
    const usdAmount = solAmount * solToUSD;

    // Calculate the amount of tokens
    const tokenAmount = usdAmount / tokenPrice;

    return tokenAmount.toFixed(0);
}
