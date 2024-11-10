import React, { useState } from "react";
import { ethers } from "ethers";  // Make sure this import is on top
const { isAddress, parseUnits } = ethers.utils;

import useWeb3 from "../hooks/useWeb3";

const RequestTokens = () => {
  const { contract } = useWeb3();
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState("");

  const maxRequestAmount = 100; // Maximum GToken amount that can be requested
  const amount = maxRequestAmount; // Set the amount to 100 permanently

  const handleRequestTokens = async () => {
    // Validate recipient address
    if (!isAddress(recipient)) {
      setStatus("Error: Invalid recipient address.");
      return;
    }

    // Validate amount (must be greater than zero and less than or equal to 100)
    if (amount <= 0) {
      setStatus("Error: Amount must be greater than zero.");
      return;
    }

    // Proceed with the token request
    if (contract) {
      try {
        setStatus("Processing...");
        const amountInUnits = parseUnits(amount.toString(), 18); // Convert to correct token units
        const tx = await contract.requestTokens(recipient, amountInUnits);
        await tx.wait();
        setStatus("Tokens transferred successfully!");
      } catch (error) {
        setStatus("Error: " + error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-center text-2xl font-bold">Request Tokens</h2>
      <div className="space-y-2">
        <label htmlFor="recipient" className="block">Recipient Address</label>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="amount" className="block">Amount (Max 100 GToken)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          disabled // Disable the input field so users can't change it
          className="input input-bordered w-full"
        />
      </div>
      <button 
        onClick={handleRequestTokens} 
        className="w-full bg-purple-500 hover:bg-purple-700 text-white py-2 rounded"
      >
        Request Tokens
      </button>
      {status && <p className="text-center text-sm mt-2">{status}</p>}
    </div>
  );
};

export default RequestTokens;
