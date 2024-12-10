const overlay = document.createElement('div');
overlay.classList.add('overlay'); // Ajoute la classe pour le style et l'animation

function initItem() {
    loadItem();

    const closeButton = document.getElementById("cancel-button");
    closeButton.addEventListener('click', () => closeOverlay(overlay)); // Ferme la popup
}


function loadItem() {

    overlay.innerHTML = '';

    // Ajoute le contenu du nouvel élément
    const item = document.getElementById("item");
    const content = item.content.cloneNode(true);

    overlay.appendChild(content);

    // Ajoute l'overlay au body pour qu'il soit par-dessus
    document.body.appendChild(overlay);

    // Ajoute la classe pour déclencher l'animation
    requestAnimationFrame(() => overlay.classList.add('show'));
}

function closeOverlay(overlay) {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 500);
}

export { initItem };