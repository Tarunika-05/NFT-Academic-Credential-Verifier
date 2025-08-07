import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

export default function StudentWallet() {
  const [account, setAccount] = useState('');
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0]);
          fetchNFTs(accounts[0]);
        });
    }
  }, []);

  const fetchNFTs = async (addr) => {
    try {
      const res = await axios.get(`/getCredentials/${addr}`);
      setNfts(res.data);
    } catch {
      alert('Failed to fetch credentials');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Student Wallet</h2>
      <p className="mb-4 text-sm">Connected as: <span className="font-mono text-pink-600">{account}</span></p>
      {nfts.length === 0 ? (
        <p>No credentials found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nfts.map((nft, i) => (
            <div key={i} className="p-4 border rounded shadow bg-gradient-to-r from-yellow-200 to-pink-200">
              <h3 className="font-bold text-lg">{nft.name}</h3>
              <p><strong>Degree:</strong> {nft.degree}</p>
              <p><strong>Date:</strong> {nft.date}</p>
              <p><strong>Token ID:</strong> {nft.tokenId}</p>
              <div className="mt-2">
                <QRCode value={JSON.stringify(nft)} size={100} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
