import React, { useState } from 'react';
import { GenLayerClient } from 'genlayer-js'; // Ensure you install this via npm

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
  const [url, setUrl] = useState('');
  const [complaint, setComplaint] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runArbitration = async () => {
    setLoading(true);
    try {
      // Connect to GenLayer Testnet/Studio
      const client = new GenLayerClient('https://rpc.genlayer.com'); 
      
      // Execute the 'request_arbitration' method from your Python contract
      const tx = await client.writeContract({
        address: CONTRACT_ADDRESS,
        method: 'request_arbitration',
        args: [url, complaint]
      });

      setResult(tx.output);
    } catch (error) {
      console.error(error);
      setResult("Error: Could not reach consensus.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>⚖️ AI Warranty Arbiter</h1>
      <p>Enter a product URL and your complaint. Our AI validators will decide your refund.</p>
      
      <input 
        placeholder="Product URL (e.g. Amazon/Tech site)" 
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea 
        placeholder="What is wrong with the product?" 
        style={{ width: '100%', height: '100px', padding: '10px' }}
        onChange={(e) => setComplaint(e.target.value)}
      />
      
      <button 
        onClick={runArbitration} 
        disabled={loading}
        style={{ marginTop: '20px', padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {loading ? "AI Validators are debating..." : "Submit to On-Chain Jury"}
      </button>

      {result && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Jury Verdict:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;