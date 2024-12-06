// const input = document.querySelector('input');

// input.addEventListener("focus", (event) => {
//     event.target.style.background = "pink";
//     if (event.target.type === "password") {
//         console.log("PASSWORD PUTAIN");
//         event.target.style.visibility = "hidden";
//     }
// });

// const password = document.getElementById("passwordInput");
// password.type = "text";

// console.log("holé");

// content = document.querySelectorAll("p");

// content.forEach(element => {
//     element.style.color = "red";
// });


const inputs = document.querySelectorAll("input");

const keywords = ["e-mail", "mail", "user", "id","identifiant","nom","utilisateur","mot de passe","password","pwd"]; // Liste des mots-clés à chercher.

inputs.forEach(input => {
  input.addEventListener("click", () => {
    console.log("Clic sur un input !");
    // Vérifie si un élément proche contient un mot-clé défini.
    let shouldLog = false;

    // Vérifie si un label associé contient un mot-clé.
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) {
      shouldLog = keywords.some(keyword => label.textContent.toLowerCase().includes(keyword));
    }

    // Si aucun label trouvé ou correspondant, cherche des mots-clés dans les parents proches.
    if (!shouldLog) {
      let parent = input.parentElement;
      while (parent && !shouldLog) {
        shouldLog = keywords.some(keyword => parent.textContent.toLowerCase().includes(keyword));
        parent = parent.parentElement; // Continue à monter dans la hiérarchie.
      }
    }

    // Si un mot-clé a été trouvé, on log l'input.
    if (shouldLog) {
      console.log("Un mot-clé a été trouvé à proximité !");
      console.log(input);
    }
  });
});
