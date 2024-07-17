import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectWallet from './components/ConnectWallet';
import ListNFT from './components/ListNFT';
import DisplayNFTs from './components/DisplayNFTs';
import BuyNFT from './components/BuyNFT';

function App() {
  return (
    <Router>
      <div className="App">
        <ConnectWallet />
        <Routes>
          <Route path="/list" element={<ListNFT />} />
          <Route path="/display" element={<DisplayNFTs />} />
          <Route path="/buy" element={<BuyNFT />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
