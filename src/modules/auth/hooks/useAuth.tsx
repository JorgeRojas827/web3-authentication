import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { AuthService } from "@/services/AuthService";
import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { status } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !address || status !== "unauthenticated") return;
    handleAuthentication();
  }, [isConnected, address, status]);

  const handleAuthentication = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);
      await AuthService.authenticate(address);
    } catch (err) {
      console.error("Authentication failed:", err);
      setError("Authentication failed. Please try again.");
      disconnect();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      disconnect();
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
    }
  };

  return {
    isConnected,
    isAuthenticated: status === "authenticated",
    isAuthenticating,
    error,
    handleAuthentication,
    handleLogout,
  };
};
