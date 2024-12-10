import { getUrlData } from '../background/db.js';

function initTab() {
    loadLogins();
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
