import { useCallback, useState } from "react";
import useWallet from "./hooks/useWallet";
import { ethers } from "ethers";

export default function SendTransaction() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [{ wallet, provider }] = useWallet();
  const [txHash, setTxHash] = useState<string>();

  const sendTransaction = useCallback(async () => {
    if (!provider || !wallet) return;
    setTxHash("");
    const signer = provider.getSigner();

    const txHash = await signer.sendTransaction({
      from: wallet.accounts[0].address,
      to: "0xe3b99c8405a3ca59c2f7f4a6494a60f63df2a777",
      value: "0x0",
      gasLimit: ethers.utils.hexValue(21000),
      gasPrice: "0x2540be400",
      type: "0x0",
    });
    if (txHash) {
      setTxHash(txHash.hash);
    }
  }, [wallet, provider]);

  return (
    <div style={{ marginTop: 24 }}>
      -------------------------Send Transaction-------------------------
      <div style={{ marginTop: 12 }}>
        <button onClick={sendTransaction}>Send Transaction</button>
        <br />
        <div style={{ marginTop: 12, textAlign: "center" }}>
          txHash:{" "}
          <div style={{ width: 320, wordWrap: "break-word", margin: "0 auto" }}>
            {txHash}
          </div>
        </div>
      </div>
    </div>
  );
}
