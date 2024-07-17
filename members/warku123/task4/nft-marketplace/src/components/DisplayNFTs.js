import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useProvider } from 'wagmi';
import NFTMarket from '../contracts/NFTMarket.json';

const DisplayNFTs = () => {
  const [listings, setListings] = useState([]);
  const provider = useProvider();

  useEffect(() => {
    const fetchListings = async () => {
      const contract = new ethers.Contract('0x1E850f5010E94B70de98085Afe2DD434322DdF40', NFTMarket.abi, provider);
      const listingCount = await contract.nextListingId();
      const allListings = [];
      for (let i = 0; i < listingCount; i++) {
        const listing = await contract.listings(i);
        if (listing.price > 0) {
          allListings.push({
            listingId: i,
            seller: listing.seller,
            nftContract: listing.nftContract,
            tokenId: listing.tokenId,
            price: ethers.utils.formatUnits(listing.price, 6),
          });
        }
      }
      setListings(allListings);
    };

    fetchListings();
  }, [provider]);

  return (
    <div>
      <h2>All Listed NFTs</h2>
      {listings.map((listing) => (
        <div key={listing.listingId}>
          <p>NFT Contract: {listing.nftContract}</p>
          <p>Token ID: {listing.tokenId}</p>
          <p>Price: {listing.price} PGK</p>
          <p>Seller: {listing.seller}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayNFTs;
