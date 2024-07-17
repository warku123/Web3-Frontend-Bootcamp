import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ConnectWallet from './components/ConnectWallet';
import ListNFT from './components/ListNFT';
import DisplayNFTs from './components/DisplayNFTs';
import BuyNFT from './components/BuyNFT';

function App() {
  return (
    <Router>
      <div className="App">
        <ConnectWallet />
        <Switch>
          <Route path="/list" component={ListNFT} />
          <Route path="/display" component={DisplayNFTs} />
          <Route path="/buy" component={BuyNFT} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
