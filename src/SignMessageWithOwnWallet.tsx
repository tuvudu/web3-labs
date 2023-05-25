import { ethers } from "ethers";
import { useCallback, useState } from "react";
// import useWallet from "./hooks/useWallet";

/**
 * use for create new wallet
 */
const createNewWallet = () => {
  const wallet = ethers.Wallet.createRandom();

  console.log(wallet);
  // Retrieve the wallet's private key and mnemonic phrase
  const privateKey = wallet.privateKey;
  const mnemonic = wallet.mnemonic;

  // Display the wallet address, private key, and mnemonic phrase
  console.log("Wallet Address:", wallet.address);
  console.log("Private Key:", privateKey);
  console.log("Mnemonic Phrase:", mnemonic);
};

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

const PRIVATE_KEY =
  "0x356f94095e769934f021a2a24e90a3aa050db64368c00070385449adfdf4afdb";

export default function SignMessageWithOwnWallet() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const [{ wallet, provider }] = useWallet();
  const [sign, setSign] = useState<string>();

  const signMessage = useCallback(async () => {
    // createNewWallet();
    // if (!provider || !wallet) return;
    setSign("");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const sign = await wallet.signMessage("Hello World");

    if (sign) {
      setSign(sign);
    }
  }, []);

  return (
    <div style={{ marginTop: 24 }}>
      -------------------------SIGN MESSAGE WITH CREATED
      WALLET-------------------------
      <div style={{ marginTop: 12 }}>
        <button onClick={signMessage}>SignMessage</button>
        <br />
        <div style={{ marginTop: 12, textAlign: "center" }}>
          signed:{" "}
          <div style={{ width: 320, wordWrap: "break-word", margin: "0 auto" }}>
            {sign}
          </div>
        </div>
      </div>
    </div>
  );
}
