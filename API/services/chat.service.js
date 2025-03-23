require("dotenv").config();

async function callHuggingFace(question) {
  const MODEL = "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B";

  const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: question }),
  });

  if (!res.ok) throw new Error("Erreur Hugging Face");

  const data = await res.json();
  return data?.[0]?.generated_text || "Pas de réponse";
}

module.exports = { callHuggingFace };
