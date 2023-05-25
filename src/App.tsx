import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ledgerModule from "./packages/ledger";
import trezorModule from "@web3-onboard/trezor";
import walletConnectModule from "@web3-onboard/walletconnect";
import trustModule from "@web3-onboard/trust";
import ConnectWallet from "./ConnectWallet";

import blockNative from "./assets/blocknative.svg";
import krystal from "./assets/krystal.svg";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import SignMessage from "./SignMessage";
import SendTransaction from "./SendTransaction";
import SignMessageWithOwnWallet from "./SignMessageWithOwnWallet";

const INFURA_KEY = "";

const injected = injectedModule();
const walletConnect = walletConnectModule();

const ledger = ledgerModule();
const trust = trustModule();

const trezorOptions = {
  email: "test@test.com",
  appUrl: "https://www.blocknative.com",
};

const trezor = trezorModule(trezorOptions);

const wallets = [injected, trust, ledger, trezor, walletConnect];

const chains = [
  {
    id: "0x1",
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  {
    id: "0x539",
    token: "ETH",
    label: "Localhost 8545",
    rpcUrl: `http://localhost:8545`,
  },
  {
    id: "0x5",
    token: "ETH",
    label: "Goerli",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  },
  {
    id: "0xaa36a7",
    token: "SepoliaETH",
    label: "Sepolia",
    rpcUrl: `https://sepolia.infura.io/v3`,
  },
  {
    id: "0x13881",
    token: "MATIC",
    label: "Polygon - Mumbai",
    rpcUrl: "https://matic-mumbai.chainstacklabs.com",
  },
  {
    id: "0x38",
    token: "BNB",
    label: "Binance",
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  {
    id: "0xA",
    token: "OETH",
    label: "Optimism",
    rpcUrl: "https://mainnet.optimism.io",
  },
  {
    id: "0xA4B1",
    token: "ARB-ETH",
    label: "Arbitrum",
    rpcUrl: "https://rpc.ankr.com/arbitrum",
  },
];

const appMetadata = {
  name: "Connect Wallet Example",
  icon: "<svg>My App Icon</svg>",
  description: "Example showcasing how to connect a wallet.",
  recommendedInjectedWallets: [
    { name: "MetaMask", url: "https://metamask.io" },
    { name: "Coinbase", url: "https://wallet.coinbase.com/" },
  ],
};

const web3Onboard = init({
  wallets,
  chains,
  appMetadata,
  theme: "dark",
});

function App() {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://onboard.blocknative.com/" target="_blank">
            <img
              src={blockNative}
              className="logo react"
              alt="BlockNative logo"
            />
          </a>
          <a href="https://krystal.app/" target="_blank">
            <img src={krystal} className="logo react" alt="Krystal logo" />
          </a>
        </div>
        <h1>Vite + React + BlockNative + Krystal</h1>

        <p className="read-the-docs">
          Click to access <i>Web3</i> wallet
        </p>
      </>
      <ConnectWallet />
      <SignMessage />
      <SignMessageWithOwnWallet />
      <SendTransaction />
    </Web3OnboardProvider>
  );
}

export default App;
