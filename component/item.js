import { addUrl } from "../background/db.js";

const overlay = document.createElement('div');
overlay.classList.add('overlay');

function initItem() {
    loadItem();

    const closeButton = document.getElementById("cancel-button");
    const saveButton = document.getElementById("save-button");
    const website = document.getElementById("hostname");
    const email = document.getElementById("username");
    const password = document.getElementById("password");

    getTabHostname().then(currentHostname => {
        website.value = currentHostname;
    });

    saveButton.addEventListener("click", async () => {
        getTabHostname().then(currentHostname => {
            addUrl(currentHostname, email.value, password.value)
                .then(() => {
                    console.log(currentHostname, "successfully added to db");
                    closeOverlay(overlay);
                })
                .catch(error => {
                    console.log("Error adding site to db:", error);
                });
        }).catch(error => {
            console.log("Error retrieving tab hostname:", error);
        });
    });

    closeButton.addEventListener('click', () => closeOverlay(overlay));
}


function loadItem() {

    overlay.innerHTML = '';

    const item = document.getElementById("item");
    const content = item.content.cloneNode(true);

    overlay.appendChild(content);

    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('show'));
}

function closeOverlay(overlay) {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 500);
}

async function getTabHostname() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            try {
                const url = new URL(tabs[0].url);
                resolve(url.hostname);
            } catch (error) {
                reject(error);
            }
        });
    });
}

export { initItem };