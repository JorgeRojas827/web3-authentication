import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import { connectContract } from "@/config/web3";

export class AuthService {
  private static createAuthMessage(address: string): string {
    return `Sign this message to authenticate: ${address.toLowerCase()}`;
  }

  static async authenticate(address: string) {
    try {
      const contract = await connectContract();
      if (!contract) throw new Error("Failed to connect to contract");

      const csrfResponse = await fetch("/api/auth/csrf");
      const { csrfToken } = await csrfResponse.json();

      const message = this.createAuthMessage(address);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const signature = await signer.signMessage(message);

      const tx = await contract.verifySignature(message, signature);
      await tx.wait();

      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: message,
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce: csrfToken,
      });

      const response = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: JSON.stringify(siweMessage),
          signature,
          redirect: false,
        }),
      });

      if (!response.ok) throw new Error("Authentication failed");

      return true;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }

  static async logout() {
    try {
      const contract = await connectContract();
      if (!contract) throw new Error("Failed to connect to contract");

      const tx = await contract.revokeAuthentication();
      await tx.wait();

      await fetch("/api/auth/signout", { method: "POST" });
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}
