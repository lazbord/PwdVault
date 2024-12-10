import { removeDB, getAllLogins } from '../background/db.js';
import { initItem } from '../component/item.js';

function initVault() {
    loadVaultLogins();
    const clearDbButton = document.getElementById("clear-db-button");
    const newItemButton = document.getElementById("new-item-button");

    clearDbButton.addEventListener("click", () => {
        removeDB().then(() => {
            alert("Database has been reset");
        })
        .catch(error => {
            console.log(error);
        })
    });

    newItemButton.addEventListener("click", () => {
        initItem();
    });

}

async function loadVaultLogins() {
    getAllLogins()
        .then((event) => {

            let vault = document.getElementById("logins");
                
            if (event) {
                event.forEach(element => {
                let newDiv = document.createElement("div");
                let button1 = document.createElement("button");
                let button2 = document.createElement("button");
                let name = document.createElement("p");
                newDiv.className = 'site';
    
                name.innerText = element.hostname;
                button1.innerHTML = element.email;
                button2.innerHTML = element.password;
    
                newDiv.appendChild(name);
                newDiv.appendChild(button1);
                newDiv.appendChild(button2);
    
                vault.appendChild(newDiv);
                });
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
}

export { initVault };
