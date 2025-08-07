import React, { useState } from 'react';
import axios from 'axios';

export default function VerifierPortal() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`/verifyCredential/${id}`);
      setResult(res.data);
    } catch {
      alert('Verification failed.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white text-gray-900 p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Verifier Portal</h2>
      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="Enter Token ID" className="p-3 rounded border border-gray-300" required />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Verify</button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded shadow">
          <h3 className="text-lg font-bold text-green-800">✅ Credential Verified</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Degree:</strong> {result.degree}</p>
          <p><strong>Date:</strong> {result.date}</p>
          <p><strong>Valid:</strong> {result.valid ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
