import { useCallback, useState } from "react";
import useWallet from "./hooks/useWallet";

export default function SignMessage() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [{ wallet, provider }] = useWallet();
  const [sign, setSign] = useState<string>();

  const signMessage = useCallback(async () => {
    if (!provider || !wallet) return;
    setSign("");
    const signer = provider.getSigner();
    const sign = await signer.signMessage("Hello World");

    if (sign) {
      setSign(sign);
    }
  }, [wallet, provider]);

  return (
    <div style={{ marginTop: 24 }}>
      -------------------------SIGN MESSAGE-------------------------
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
