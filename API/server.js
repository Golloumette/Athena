// server.js
// =================================
// Un simple serveur Node sans Express, utilisant http et fetch (Node 18+)

const http = require("http"); // Module natif pour créer un serveur
const PORT = 3000;            // Port d'écoute du serveur

const server = http.createServer(async (req, res) => {
  // Vérifier la route et la méthode
  if (req.url === "/test" && req.method === "GET") {
    try {
      // Exemple : appeler l'API publique de GitHub
      // (avec Node 18+ vous avez directement accès à 'fetch')
      const response = await fetch("https://api.github.com");
      const data = await response.json();

      // Retourner le résultat au client
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, data }));
    } catch (error) {
      // Gérer l'erreur
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  } else {
    // Route non gérée
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});