const { handleAsk,handleHistory } = require("../controllers/chat.controller");

function router(req, res) {
  if (req.url === "/ask" && req.method === "POST") {
    return handleAsk(req, res);
  }

  if (req.url === "/history" && req.method === "GET") {
    return handleHistory(req, res);
  }

  // OPTIONS pour CORS
  if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": "*",
    });
    return res.end();
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route non trouvée" }));
}

module.exports = router;
