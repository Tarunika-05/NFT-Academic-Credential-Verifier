import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function IssuerForm() {
  const [account, setAccount] = useState('');
  const [form, setForm] = useState({ name: '', degree: '', date: '' });
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => setAccount(accounts[0]));
    }
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/mintCredential', { ...form, issuer: account });
      setTxHash(res.data.txHash);
    } catch (err) {
      alert('Minting failed!');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white text-gray-900 p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Issuer Portal</h2>
      <p className="mb-4 text-sm">Connected as: <span className="font-mono text-purple-600">{account}</span></p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Student Name" value={form.name} onChange={handleChange} className="p-3 rounded border border-gray-300" required />
        <input type="text" name="degree" placeholder="Degree" value={form.degree} onChange={handleChange} className="p-3 rounded border border-gray-300" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 rounded border border-gray-300" required />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Mint Credential</button>
      </form>
      {txHash && <p className="mt-4 text-green-600">✅ Minted! TxHash: <span className="font-mono">{txHash}</span></p>}
    </div>
  );
}
