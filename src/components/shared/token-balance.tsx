"use client"

import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';


const TokenBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  return (
    <div>
      
      
     
      {balance !== null && <p>Balance: {balance}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TokenBalance;
