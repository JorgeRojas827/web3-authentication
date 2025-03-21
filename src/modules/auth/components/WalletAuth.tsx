import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuth } from "../hooks/useAuth";

export default function WalletAuth() {
  const { isConnected } = useAuth();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="rounded-full border border-solid border-transparent 
                      transition-colors flex items-center justify-center 
                      bg-foreground text-background gap-2 
                      hover:bg-[#383838] dark:hover:bg-[#ccc] 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                      font-medium text-sm h-10 px-4"
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div className="flex flex-col items-center gap-4">
                  <div className="text-sm font-mono">
                    Connected to {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={openAccountModal}
                      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] 
                        transition-colors flex items-center justify-center 
                        hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent 
                        font-medium text-sm h-10 px-4 cursor-pointer"
                      type="button"
                    >
                      Manage Accounts
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
