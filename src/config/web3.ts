"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { http } from "wagmi";
import { mainnet, moonbeam, sepolia } from "wagmi/chains";
import { authContractAbi } from "./abi";

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID");
}

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const config = getDefaultConfig({
  appName: "Web3 Authentication",
  projectId,
  chains: [mainnet, sepolia, moonbeam],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [moonbeam.id]: http(),
  },
});

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";

export const connectContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected!");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, authContractAbi, signer);
};
