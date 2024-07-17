import React from 'react';
import ReactDOM from 'react-dom';
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import './index.css';

const alchemyApiKey = 'your-alchemy-api-key'; // 替换为你的Alchemy API Key

const { provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyApiKey }),
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains: defaultChains,
    }),
  ],
  provider,
  webSocketProvider,
});

ReactDOM.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
  document.getElementById('root')
);
