import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useSigner } from 'wagmi';
import NFTMarket from '../contracts/NFTMarket.json';
import MyToken from '../contracts/MyToken.json';

const BuyNFT = () => {
  const [listingId, setListingId] = useState('');
  const { data: signer } = useSigner();

  const handleBuy = async () => {
    if (!signer) return alert('Please connect your wallet');

    const marketContract = new ethers.Contract('0x1E850f5010E94B70de98085Afe2DD434322DdF40', NFTMarket.abi, signer);
    const tokenContract = new ethers.Contract('0xcEDC4aE58aE7748453fF31a4db1F264E198586d9', MyToken.abi, signer);

    try {
      const listing = await marketContract.listings(listingId);
      await tokenContract.approve(marketContract.address, listing.price);
      const tx = await marketContract.buyNFT(listingId);
      await tx.wait();
      alert('NFT purchased successfully!');
    } catch (err) {
      console.error(err);
      alert('Purchase failed');
    }
  };

  return (
    <div>
      <h2>Buy NFT</h2>
      <input
        type="text"
        placeholder="Listing ID"
        value={listingId}
        onChange={(e) => setListingId(e.target.value)}
      />
      <button onClick={handleBuy}>Buy NFT</button>
    </div>
  );
};

export default BuyNFT;
