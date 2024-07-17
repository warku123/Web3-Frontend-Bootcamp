// src/utils/ethersConfig.js
import { ethers } from "ethers";

let provider;
let signer;

if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
}

export { provider, signer };
