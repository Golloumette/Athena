

const btnSendRequete =document.getElementById("buttonSendRequete");
btnSendRequete.addEventListener("click",sendRequete);

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
            // Ici, vous pouvez afficher result.data
            document.getElementById("response").textContent = JSON.stringify(result.data);
          } else {
            document.getElementById("response").textContent = "Erreur : " + result.error;
          }
        } catch (error) {
          console.error("Erreur fetch:", error);
          document.getElementById("response").textContent = "Erreur : " + error.message;
        }
      }