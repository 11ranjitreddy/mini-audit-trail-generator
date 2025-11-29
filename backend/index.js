const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(cors());
app.use(express.json());
let versionHistory = [];
let lastText = "";
function splitWords(text) {
    return text.trim().split(/\s+/).filter(w => w.length > 0);
}
app.post("/save-version", (req, res) => {
    const newText = req.body.text || "";
    const oldWords = splitWords(lastText);
    const newWords = splitWords(newText);
    const addedWords = newWords.filter(w => !oldWords.includes(w));
    const removedWords = oldWords.filter(w => !newWords.includes(w));
    const entry = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        addedWords,
        removedWords,
        oldLength: oldWords.length,
        newLength: newWords.length
    };
    versionHistory.push(entry);
    lastText=newText;
    res.json(entry);
});
app.get("/versions",(req, res) => {
    res.json(versionHistory);
});
const PORT = 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
