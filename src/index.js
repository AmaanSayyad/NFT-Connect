import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygonMumbai,
  polygon,
  optimism,
  goerli,
  arbitrum,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const { chains, provider } = configureChains(
  [mainnet, goerli, polygonMumbai, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: "9McXtaYKbr8Y3SyMb3Be_rgZwREq4r3J" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const huddleClient = getHuddleClient(
  "d0598327fcb21348231eaf1046b8180cc0106b2e041b846b65d64b1b08be81fe"
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HuddleClientProvider client={huddleClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>{" "}
    </HuddleClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
