import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useWeb3 = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const initWeb3 = async () => {
        try {
          // การสร้าง provider จาก window.ethereum
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []); // ขออนุญาตเชื่อมต่อกับผู้ใช้
          const signer = provider.getSigner();

          // ที่อยู่ของ contract และ ABI ของ contract
          const contractAddress = "0x2cc7946357813a2e3a60433a87878a0f592a0dd8"; // เปลี่ยนเป็นที่อยู่ของ contract ที่ deploy
          const contractABI = [
            "function requestTokens(address to, uint256 amount) public",
            "function balanceOf(address account) public view returns (uint256)"
          ];

          // สร้าง contract
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          
          setProvider(provider);
          setSigner(signer);
          setContract(contract);
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      };

      initWeb3();
    } else {
      console.error("Ethereum provider not found. Please install MetaMask or another Ethereum wallet.");
    }
  }, []);

  const requestTokens = async (to, amount) => {
    if (!contract) return;
    try {
      const tx = await contract.requestTokens(to, ethers.utils.parseUnits(amount.toString(), 18)); 
      await tx.wait(); 
      console.log("Transaction successful:", tx);
    } catch (error) {
      console.error("Error requesting tokens:", error);
    }
  };

  return { provider, signer, contract, requestTokens };
};

export default useWeb3;
