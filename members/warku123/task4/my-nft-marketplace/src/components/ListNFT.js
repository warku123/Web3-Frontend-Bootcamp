import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useSigner } from 'wagmi';
import NFTMarket from '../contracts/NFTMarket.json';

const ListNFT = () => {
  const [nftContract, setNftContract] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');
  const { data: signer } = useSigner();

  const handleList = async () => {
    if (!signer) return alert('Please connect your wallet');

    const contract = new ethers.Contract('0x1E850f5010E94B70de98085Afe2DD434322DdF40', NFTMarket.abi, signer);

    try {
      const tx = await contract.listNFT(nftContract, tokenId, ethers.utils.parseUnits(price, 6));
      await tx.wait();
      alert('NFT listed successfully!');
    } catch (err) {
      console.error(err);
      alert('Listing failed');
    }
  };

  return (
    <div>
      <h2>List NFT</h2>
      <input
        type="text"
        placeholder="NFT Contract Address"
        value={nftContract}
        onChange={(e) => setNftContract(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price (in PGK)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleList}>List NFT</button>
    </div>
  );
};

export default ListNFT;
