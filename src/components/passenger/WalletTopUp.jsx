import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const WalletTopUp = () => {
  const [amount, setAmount] = useState(0);

  const handleToken = (token) => {
    alert('Payment Successful');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Top-Up Wallet</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={handleToken}
        amount={amount * 100}
        name="Bus Wallet Top-Up"
        currency="ZAR"
      />
    </div>
  );
};

export default WalletTopUp;
