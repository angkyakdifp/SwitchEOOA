import React from 'react';
import './WalletRow.css'; // Assuming you have a CSS file for styling
import { WalletBalance } from '../models/WalletBalance';

interface WalletRowProps {
  usdValue: string;
  balance: WalletBalance;
  className?: string; // For applying additional styles if needed
}

const WalletRow: React.FC<WalletRowProps> = ({ usdValue, balance, className }) => {
  return (
    <div className={`wallet-row ${className}`}>
      <div className="wallet-row__currency">
        <span>Currency:</span> {balance.blockchain}
      </div>
      <div className="wallet-row__amount">
        <span>Amount:</span> {balance.amount}
      </div>
      <div className="wallet-row__usd-value">
        <span>USD Value:</span> ${usdValue}
      </div>
    </div>
  );
};

export default WalletRow;
