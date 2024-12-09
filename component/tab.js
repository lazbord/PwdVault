import { addUrl, showDB, removeDB, getUrlData } from '../background/db.js';

function initTab() {
    loadLogins();
    const button1 = document.getElementById("store-url-button");
    const button2 = document.getElementById("show-url-button");
    const button3 = document.getElementById("clear-db-button");
    const button4 = document.getElementById("get-usr&pwd-button");

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
            alert("Database has been reset");
        })
        .catch(error => {
            console.log(error);
        })
    });

    button4.addEventListener("click", () => {
        getTabHostname().then(currentHostname => {
            getUrlData(currentHostname)
                .then((event) => {
                    console.log(event);
                })
                .catch(error => {
                    console.log("Error fetching data from url:", error);
                });
        }).catch(error => {
            console.log("Error retrieving tab hostname:", error);
        });
    });
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

async function loadLogins() {
    getTabHostname().then(currentHostname => {
        getUrlData(currentHostname)
            .then((event) => {

                let vault = document.getElementById("logins");
                
                if (event) {
                    let newDiv = document.createElement("div");
                    let button1 = document.createElement("button");
                    let button2 = document.createElement("button");
                    let name = document.createElement("p");
                    newDiv.className = 'site';
    
                    name.innerText = event.hostname;
                    button1.innerHTML = event.email;
                    button2.innerHTML = event.password;
    
                    newDiv.appendChild(name);
                    newDiv.appendChild(button1);
                    newDiv.appendChild(button2);
    
                    vault.appendChild(newDiv);
                }
                else {
                    let name = document.createElement("p");
                    name.innerText = "No logins saved for this site";
                    vault.appendChild(name);
                }
            })
            .catch(error => {
                console.log("Error fetching data from url:", error);
            });
    }).catch(error => {
        console.log("Error retrieving tab hostname:", error);
    });
}

export { initTab };
