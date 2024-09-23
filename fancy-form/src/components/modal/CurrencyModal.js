import React, { useState } from "react";
import SearchIcon from "../../assets/search.png"
import "./CurrencyModal.css"; // Ensure you create this CSS file for styles

const CurrencyModal = ({ isOpen, onClose, onSelectCurrency, currencies }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const handleSelect = (currency) => {
    onSelectCurrency(currency);
    onClose(); // Close the modal after selection
  };

  // Filter currencies based on search term
  const filteredCurrencies = currencies.filter((currency) =>
    currency.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="header-wrapper">
            <div className="modal-header">
                <h3>Select a token</h3>
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
            </div>
            <div className="search-wrapper">
                <img className="search-icon" src={SearchIcon} alt="Search Icon"></img>
                <input
                type="text"
                className="search-input"
                placeholder="Search tokens"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="modal-body">
          <ul className="currency-list">
            {filteredCurrencies.map((currency) => (
              <li
                key={currency.symbol}
                className="currency-item"
                onClick={() => handleSelect(currency)}
              >
                <img
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/078a728cbc6263ee00d131286877d0f7428665c6/tokens/${currency.currency.startsWith("ST") && currency.currency !== "STRD" ? currency.currency.replace("ST", "st") : currency.currency.startsWith("R") ? currency.currency.replace("R", "r") : currency.currency}.svg`}
                  alt={currency.currency}
                  className="currency-icon"
                />
                <span className="currency-name">{currency.currency}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrencyModal;
