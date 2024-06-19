
"use client";

import React, { useState, useEffect } from 'react';
import styles from './CurrencySwapForm.module.css';

const CurrencySwapForm: React.FC = () => {
  const [amount, setAmount] = useState<number | string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const fetchExchangeRate = async () => {
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await res.json();
      setExchangeRate(data.rates[toCurrency]);
    } catch (error) {
      setError('Error fetching exchange rate');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (amount && exchangeRate) {
        setResult(Number(amount) * exchangeRate);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.currencySwapForm}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>From:</label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currencies as needed */}
        </select>
      </div>
      <div>
        <label>To:</label>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currencies as needed */}
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Swap'}
      </button>
      {result !== null && (
        <div>
          <h3>Result:</h3>
          <p>{amount} {fromCurrency} = {result} {toCurrency}</p>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default CurrencySwapForm;
