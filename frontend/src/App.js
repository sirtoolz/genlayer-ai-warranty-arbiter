import React, { useState } from 'react';
import { createClient } from 'genlayer-js';
import { testnetAsimov } from 'genlayer-js/chains';

// Replace with the address you got from studio.genlayer.com
const CONTRACT_ADDRESS = "0xd32209cE097Ed2C91050dc7c720963165A97C7fc";

function App() {
  const [url, setUrl] = useState('');
  const [complaint, setComplaint] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runArbitration = async () => {
    setLoading(true);
    setResult(null);
    try {
      // 1. Initialize the client using the latest factory pattern
      const client = createClient({
        chain: testnetAsimov,
      });

      // 2. Execute the Intelligent Contract call
      // functionName matches the name of your @gl.public.write method in Python
      const txHash = await client.writeContract({
        address: CONTRACT_ADDRESS,
        functionName: 'request_arbitration',
        args: [url, complaint],
      });

      setResult(`Success! Transaction Hash: ${txHash}`);
    } catch (error) {
      console.error("GenLayer Error:", error);
      setResult("Error: AI Consensus failed or contract not found. Check Console.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1 style={{ color: '#007bff' }}>⚖️ GenLayer AI Arbiter</h1>
      <p>Decentralized Warranty Justice via Intelligent Contracts</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Paste Product URL here..." 
          style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <textarea 
          placeholder="Explain your complaint in detail..." 
          style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      
      <button 
        onClick={runArbitration} 
        disabled={loading}
        style={{ 
          padding: '12px 24px', 
          background: loading ? '#ccc' : '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {loading ? "AI Validators are debating..." : "Get AI Verdict"}
      </button>

      {result && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '5px solid #007bff' }}>
          <h3>Jury Output:</h3>
          <p style={{ wordBreak: 'break-all' }}>{result}</p>
        </div>
      )}
      
      <footer style={{ marginTop: '50px', fontSize: '12px', color: '#666' }}>
        Built on GenLayer Testnet Asimov • Intelligent Contracts v1.0
      </footer>
    </div>
  );
}

export default App;