const http = require("http");
const router = require("./routes/chat.routes");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`✅ Serveur démarré : http://localhost:${PORT}`);
});







/*require("dotenv").config(); // Charge les variables d'environnement (HF_API_TOKEN)

const http = require("http"); // Serveur Node natif
const PORT = process.env.PORT || 3000;
const pool = require("./db"); // <-- script pour la connexion à la bdd

// Reprend exactement la fonction fournie
async function queryModelWithFetch(inputText) {
  const MODEL_NAME = "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B";

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: inputText,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Création d'un serveur simple
const server = http.createServer(async (req, res) => {
    // Autoriser CORS pour éviter les blocages
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.url === "/ask" ) {
    if(req.method == "POST"){
    // On veut lire le JSON envoyé par le client
    let body = "";
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        // Ex: body = { "question": "Qui est le plus intelligent ?" }
        const data = JSON.parse(body);
        const question = data.question || "quel est la couleur du soleil";

        // Appeler la fonction pour interroger Hugging Face
        const result = await queryModelWithFetch(question);

        // Renvoyer la réponse au front-end
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, data: result }));
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.toString() }));
      }
    });} else if (req.method === "OPTIONS") {
      // Prise en charge des requêtes OPTIONS
      res.writeHead(200, {
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      });
      res.end();

    }
  } else {
    // Route non gérée
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});*/