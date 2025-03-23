const { insertResponse, insertRequete } = require("../dao/chat.dao");
const { callHuggingFace } = require("../services/chat.service");

async function handleAsk(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const question = data.question || "Pas de question";

      const responseText = await callHuggingFace(question);
      const responseId = await insertResponse(responseText);
      await insertRequete(responseId, question);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, data: responseText }));
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  });
}

module.exports = { handleAsk };
