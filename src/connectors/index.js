import { RPC_URL } from "src/constants";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 43113, 1074, 9732, 321, 9731],
});

export const walletlink = new WalletLinkConnector({
  url: [RPC_URL],
  appName: "web3-react example",
  supportedChainIds: [1, 3, 4, 5, 42, 10, 137, 69, 420, 80001, 9731],
});

export const SUPPORTED_WALLETS = [
  {
    name: "METAMASK",
    data: {
      connector: injected,
      name: "MetaMask",
      iconName: "/images/walletImages/metamask-fox.svg",
      description: "Easy-to-use browser extension.",
      href: null,
      color: "#E8831D",
    },
  },

  {
    name: "COINBASE",
    data: {
      connector: walletlink,
      name: "Coinbase",
      iconName: "/images/walletImages/coinbase.jpeg",
      description: "Your Gateway to the World of Blockchain",
      href: null,
      color: "#E8831D",
    },
  },
];
