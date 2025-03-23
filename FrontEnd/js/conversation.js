

const btnSendRequete =document.getElementById("buttonSendRequete");
btnSendRequete.addEventListener("click",sendRequete);

const historyList = document.getElementById("historyList");

async function sendRequete(){
   
    const question = document.getElementById("requete").value;
   console.log(question)
    try {
        const response = await fetch(
          "http://localhost:3000/ask",
          {
            method: "POST",
            headers: {
            
              "Content-Type": "application/json",
            },
            body: JSON.stringify({question}
            ),
          }
        );
     
        if (!response.ok) {
            throw new Error(`Erreur HTTP code erreur status : ${response.status}`);
          }
  
          const result = await response.json();
          console.log("Réponse du serveur :", result);
  
          if (result.success) {
            const answer = result.data;
            // Ici, vous pouvez afficher result.data
            document.getElementById("response").textContent = answer;

            addToHistory(question, answer);
          } else {
            document.getElementById("response").textContent = "Erreur : " + result.error;
          }
        } catch (error) {
          console.error("Erreur fetch:", error);
          document.getElementById("response").textContent = "Erreur : " + error.message;
        }
      }
      // Fonction pour ajouter un item à l'historique
function addToHistory(question, answer) {
  const li = document.createElement("li");
  const shortAnswer = answer.length > 100 ? answer.slice(0, 100) + "..." : answer;

  li.innerHTML = `<strong>Q :</strong> ${question}<br><strong>R :</strong> ${shortAnswer}`;
  
  // ➕ Insère en haut de la liste (ordre décroissant)
  historyList.prepend(li);
}

window.addEventListener("DOMContentLoaded", loadHistory);

async function loadHistory() {
  try {
    const res = await fetch("http://localhost:3000/history");

    if (!res.ok) {
      throw new Error("Erreur lors du chargement de l'historique");
    }

    const result = await res.json();

    if (result.success) {
      result.data.forEach(item => {
        addToHistory(item.text_requete, item.text_response);
      });
    }
  } catch (error) {
    console.error("Erreur historique :", error);
  }
}