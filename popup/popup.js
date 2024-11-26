console.log("This is a popup!");

let stockageUrl = []; // Variable locale pour stocker les URLs

document.addEventListener("DOMContentLoaded", () => {
    // Charger les URLs depuis localStorage au démarrage
    const storedUrls = JSON.parse(localStorage.getItem("stockageUrl")) || [];
    stockageUrl = storedUrls; // Met à jour la variable locale

    // Associer les boutons à leurs actions
    const button1 = document.getElementById("get-url-button");
    const button2 = document.getElementById("reveal-button");

    button1.addEventListener("click", () => {
        getUrl();
    });

    button2.addEventListener("click", () => {
        reveal();
    });
});

function getUrl() {
    const urlElement = document.getElementById("URL");

    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

        if (tab && tab.url) {
            urlElement.innerHTML = "URL ajouté !";
            let myurl = new URL(tab.url)
            stockageUrl.push(myurl.hostname); // Ajoute l'URL à la liste locale
            localStorage.setItem("stockageUrl", JSON.stringify(stockageUrl)); // Sauvegarde la liste mise à jour dans localStorage
        }
    })();
}

function reveal() {
    const stockageElement = document.getElementById("stockage");

    // Afficher les URLs stockées
    stockageElement.innerHTML = stockageUrl.join("<br>"); // Séparé par des sauts de ligne
}
