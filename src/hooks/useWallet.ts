import { useConnectWallet } from "@web3-onboard/react";
import { useMemo } from "react";
import { ethers } from "ethers";

export default function useWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const provider = useMemo(() => {
    if (wallet) {
      return new ethers.providers.Web3Provider(wallet.provider, "any");
    }
    return null;
  }, [wallet]);

  return [{ wallet, connecting, provider }, connect, disconnect];
}
