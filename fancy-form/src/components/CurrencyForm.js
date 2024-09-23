import React, { useState } from 'react';
import './CurrencyForm.css';
import CurrencyModal from './modal/CurrencyModal';

const CurrencyForm = ({ label, amount, onAmountChange, currencies, currency, handleSelectCurrency }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="currency-form">
      <CurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectCurrency={handleSelectCurrency}
        currencies={currencies}
      />
      <div className="currency-header">
        <span>{label}</span>
        <input
          type="text"
          value={amount}
          onChange={onAmountChange}
          placeholder="0.0"
          className="currency-input"
          inputMode="decimal"
        />
        {
          currency && <span>${amount*currency.price}</span>
        }
      </div>
      <div className="currency-selector" onClick={() => setIsModalOpen(true)}>
        {currency && 
        <img
        src={`https://raw.githubusercontent.com/Switcheo/token-icons/078a728cbc6263ee00d131286877d0f7428665c6/tokens/${currency.currency.startsWith("ST") && currency.currency !== "STRD" ? currency.currency.replace("ST", "st") : currency.currency.startsWith("R") ? currency.currency.replace("R", "r") : currency.currency}.svg`}
        alt={currency.currency}
        className="currency-icon"
      />}
        <span className="currency-name">{currency ? currency.currency : "Select Token"}</span>
      </div>
    </div>
  );
};

export default CurrencyForm;
