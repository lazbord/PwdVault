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


// const inputs = document.querySelectorAll("input");

// const keywords = ["e-mail", "mail", "user", "id","identifiant","nom","utilisateur","mot de passe","password","pwd"]; // Liste des mots-clés à chercher.

// inputs.forEach(input => {
//   input.addEventListener("click", () => {
//     console.log("Clic sur un input !");
//     let shouldLog = false;

//     const label = document.querySelector(`label[for="${input.id}"]`);
//     if (label) {
//       shouldLog = keywords.some(keyword => label.textContent.toLowerCase().includes(keyword));
//     }

//     if (!shouldLog) {
//       let parent = input.parentElement;
//       while (parent && !shouldLog) {
//         shouldLog = keywords.some(keyword => parent.textContent.toLowerCase().includes(keyword));
//         parent = parent.parentElement; // Continue à monter dans la hiérarchie.
//       }
//     }

//     if (shouldLog) {
//       console.log("Un mot-clé a été trouvé à proximité !");
//       console.log(input);
//     }
//   });
// });


// document.querySelector('form').addEventListener('submit', (event) => {
//   event.preventDefault(); // Prevent the form from submitting
//   const formData = new FormData(event.target); // Capture form data
//   for (const [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`); // Log each form field and its value
//   }
//   debugger;
//   // Optionally: re-submit the form if needed
//   event.target.submit();
// });
