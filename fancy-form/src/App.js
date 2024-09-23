import React, { useEffect, useState } from 'react';
import './App.css';
import SwapButton from './components/SwapButton';
import CurrencyForm from './components/CurrencyForm';

function App() {
  const [sellAmount, setSellAmount] = useState(0);
  const [sellCurrency, setSellCurrency] = useState(null);
  const [buyAmount, setBuyAmount] = useState(0);
  const [buyCurrency, setBuyCurrency] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSwap = () => {
    const currency = sellCurrency;
    setSellCurrency(buyCurrency);
    setBuyCurrency(currency);
    const amount = sellAmount;
    setSellAmount(buyAmount);
    setBuyAmount(amount);
    return;
  }

  const onSellAmountChange = e => {
    const check = Number(CheckValue(e.target.value));
    if (check >= 1e20) {
      setErrorMessage("Input exceeds limit of 1e20");
      return;
    }
    setErrorMessage("");
    if (check === -1) {
      return;
    }
    setSellAmount(check);
    if (sellCurrency && buyCurrency) {
      const rate = sellCurrency.price / buyCurrency.price;
      setBuyAmount(rate * check);
    }
  }

  const onHandleSellCurrencyChange = e => {
    setSellCurrency(e);
    if (e && buyCurrency) {
      const rate = buyCurrency.price / e.price;
      setSellAmount(rate * buyAmount);
    }  
  }

  const onHandleBuyCurrencyChange = e => {
    setBuyCurrency(e);
    if (sellCurrency && e) {
      const rate = sellCurrency.price / e.price;
      setBuyAmount(rate * sellAmount);
    }
  }

  const onBuyAmountChange = e => {
    const check = Number(CheckValue(e.target.value));
    if (check >= 1e20) {
      setErrorMessage("Input exceeds limit of 1e20");
      return;
    }
    setErrorMessage("");
    setErrorMessage(""); // Reset error message when input is valid
    if (check === -1) {
      return;
    }
    setBuyAmount(check);
    if (sellCurrency && buyCurrency) {
      const rate = buyCurrency.price / sellCurrency.price;
      setSellAmount(rate * check);
    }
  }

  const CheckValue = value => {
    if (value.length > 1 && value.startsWith("0") && !value.startsWith("0.") && /^\d*\.?\d*$/.test(value)) {
      value = value.substring(1);
      return value;
    } else if (value === "0" || /^\d*\.?\d*$/.test(value)) {
      if (value.startsWith(".")) value = "0" + value;
      if (value.length === 0) value = "0";
      return value;
    } else {
      return -1;
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch('https://interview.switcheo.com/prices.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      const currenciesName = jsonData.map((currency) => currency.currency);
      console.log(currenciesName);
      setCurrencies(jsonData.filter((currency, index) => currenciesName.indexOf(currency.currency) === index));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => fetchData, []);

  return (
    <div className="App">
      <div>
        <div className="swap-container">
          {/* Sell Form */}
          <CurrencyForm
            label="Sell"
            amount={sellAmount}
            onAmountChange={onSellAmountChange}
            currencies={currencies}
            currency={sellCurrency}
            handleSelectCurrency={onHandleSellCurrencyChange}
          />

          {/* Swap Button */}
          <SwapButton handleSwap={handleSwap} />

          {/* Buy Form */}
          <CurrencyForm
            label="Buy"
            amount={buyAmount}
            onAmountChange={onBuyAmountChange}
            currencies={currencies}
            currency={buyCurrency}
            handleSelectCurrency={onHandleBuyCurrencyChange}
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <div className="conversion-container">
          {buyCurrency && sellCurrency && (
            <span className="conversion-rate">
              1 <span>{buyCurrency.currency}</span> = {(buyCurrency.price / sellCurrency.price).toFixed(6)} <span>{sellCurrency.currency}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
