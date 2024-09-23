import React from 'react';
import './SwapButton.css';

const SwapButton = ({handleSwap}) => {
  return (
    <div className="swap-button-container">
      <button className="swap-button" onClick={handleSwap}>⇄</button>
    </div>
  );
};

export default SwapButton;