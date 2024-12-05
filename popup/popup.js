import { addUrl,showDB,removeDB } from '../background/db.js';

document.addEventListener("DOMContentLoaded", () => {
    const button1 = document.getElementById("store-url-button");
    const button2 = document.getElementById("show-url-button");
    const button3 = document.getElementById("clear-db-button");

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    button1.addEventListener("click", async () => {
        getTabHostname().then(currentHostname => {
            addUrl(currentHostname, email.value, password.value)
                .then(() => {
                    console.log(currentHostname, "successfully added to db");
                })
                .catch(error => {
                    console.log("Error adding site to db:", error);
                });
        }).catch(error => {
            console.log("Error retrieving tab hostname:", error);
        });
    });
    

    button2.addEventListener("click", () => {
        showDB().then((sites) => {
            console.table(sites)
        })
        .catch(error => {
            console.log(error);
        })
    });

    button3.addEventListener("click", () => {
        removeDB().then(() => {
            alert("Database have been reset");
        })
        .catch(error => {
            console.log(error);
        })
    });


});

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