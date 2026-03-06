import {useEffect, useState } from 'react'
import './App.css'

type AnalyzeResponse = {
  ok: boolean;
  message: string;
  top_level_nodes?: string[];
  node_count?: number;
  error?: string;
  line?: number;
  offset?: number;
};

export default function App() {
  const [status, setStatus] = useState('Loading...')
  const [code, setCode] = useState("Hi, code here!")
  const [result, setResult] = useState<AnalyzeResponse | null>(null)
  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((response) => response.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Error fetching status"));
  }, []);

  const analyzeCode = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data: AnalyzeResponse = await response.json();
      setResult(data);
    } catch {
      setResult({
        ok: false,
        message: "Failed to reach backend",
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Code Visualizer</h1>
      <p>Backend status: {status}</p>

      <h2>Python Code</h2>
      <textarea
        rows={12}
        cols={70}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br />
      <br />
      <button onClick={analyzeCode}>Analyze Code</button>

      <h2>Analysis Result</h2>

      {result && (
        <div>
          <p><strong>Success:</strong> {result.ok ? "Yes" : "No"}</p>
          <p><strong>Message:</strong> {result.message}</p>

          {result.ok && (
            <>
              <p><strong>Top-level nodes:</strong></p>
              <ul>
                {result.top_level_nodes?.map((node, index) => (
                  <li key={index}>{node}</li>
                ))}
              </ul>
              <p><strong>Node count:</strong> {result.node_count}</p>
            </>
          )}

          {!result.ok && result.error && (
            <>
              <p><strong>Error:</strong> {result.error}</p>
              <p><strong>Line:</strong> {result.line ?? "N/A"}</p>
              <p><strong>Offset:</strong> {result.offset ?? "N/A"}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
