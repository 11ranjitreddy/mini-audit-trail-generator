import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [versions, setVersions] = useState([]);

  const saveVersion = async () => {
    await fetch("http://localhost:5000/save-version", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    fetchVersions();
  };

  const fetchVersions = async () => {
    const res = await fetch("http://localhost:5000/versions");
    const data = await res.json();
    setVersions(data);
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Mini Audit Trail Generator</h2>
      <textarea
        rows="7"
        style={{ width: "100%", padding: 10 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
      />
      <button onClick={saveVersion} style={{ marginTop: 15, padding: "10px 20px" }}>
        Save Version
      </button>
      <h3 style={{ marginTop: 30 }}>Version History</h3>
      {versions.map((v) => (
        <div
          key={v.id}
          style={{
            padding: 15,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 6
          }}
        >
          <p><strong>ID:</strong> {v.id}</p>
          <p><strong>Timestamp:</strong> {v.timestamp}</p>
          <p><strong>Added:</strong> {v.addedWords.join(", ") || "None"}</p>
          <p><strong>Removed:</strong> {v.removedWords.join(", ") || "None"}</p>
          <p><strong>Old Length:</strong> {v.oldLength}</p>
          <p><strong>New Length:</strong> {v.newLength}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
