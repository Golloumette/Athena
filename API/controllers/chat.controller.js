const { insertResponse, insertRequete } = require("../dao/chat.dao");
const { callHuggingFace } = require("../services/chat.service");
const { getLastConversations } = require("../dao/chat.dao");



async function handleAsk(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const question = data.question || "Pas de question";

      console.log("Question reçue :", question);

      const responseText = await callHuggingFace(question);
      console.log("Réponse générée :", responseText);

      const responseId = await insertResponse(responseText);
      console.log("ID de la réponse insérée :", responseId);

      await insertRequete(responseId, question);
      console.log("Requête insérée avec succès.");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, data: responseText }));
    } catch (error) {
      console.error("Erreur dans handleAsk :", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  });
}

async function handleHistory(req, res) {
  try {
    console.log("Récupération de l'historique des conversations...");
    const history = await getLastConversations();
    console.log("Historique récupéré :", history);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, data: history }));
  } catch (error) {
    console.error("Erreur dans handleHistory :", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
}

module.exports = {
  handleAsk,
  handleHistory, 
};
