import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import IssuerForm from './components/IssuerForm';
import StudentWallet from './components/StudentWallet';
import VerifierPortal from './components/VerifierPortal';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-300 p-6 text-white">
        <h1 className="text-4xl font-extrabold text-center mb-10 drop-shadow-lg">🎓 NFT Credential System</h1>
        <nav className="flex justify-center gap-6 mb-8">
          <Link to="/" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-100">Issuer</Link>
          <Link to="/wallet" className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-pink-100">Student Wallet</Link>
          <Link to="/verify" className="bg-white text-yellow-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-100">Verifier</Link>
        </nav>
        <Routes>
          <Route path="/" element={<IssuerForm />} />
          <Route path="/wallet" element={<StudentWallet />} />
          <Route path="/verify" element={<VerifierPortal />} />
        </Routes>
      </div>
    </Router>
  );
}
