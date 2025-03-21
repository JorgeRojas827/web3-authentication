"use client";
import WalletAuth from "@/modules/auth/components/WalletAuth";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-2xl font-bold">Web3 Authentication</h1>
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 max-w-lg">
            Connect your Web3 wallet to access decentralized features. We
            support major wallets like MetaMask, WalletConnect, and Coinbase
            Wallet.
          </p>
          <WalletAuth />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Your wallet address and balance will appear here after connecting
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
        <a
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          href="https://ethereum.org/wallets"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn about Web3 Wallets
        </a>
        <span>•</span>
        <a
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          href="https://ethereum.org/security"
          target="_blank"
          rel="noopener noreferrer"
        >
          Security Tips
        </a>
      </footer>
    </div>
  );
}
