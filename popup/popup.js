document.addEventListener("DOMContentLoaded", () => {
    const button1 = document.getElementById("store-url-button");
    const button2 = document.getElementById("test-url-button");
    const button3 = document.getElementById("clear-db-button");

    button1.addEventListener("click", () => {
        storeUrl();
    });

    button2.addEventListener("click", () => {
        showUrl();
    });

    button3.addEventListener("click", () => {
        window.indexedDB.databases().then((r) => {
            for (var i = 0; i < r.length; i++) window.indexedDB.deleteDatabase(r[i].name);
        }).then(() => {
            alert('All data cleared.');
        });
    });

});

function storeUrl() {
    const request = indexedDB.open("db", 2);

    request.onerror = (event) => {
        console.log("Error opening the database", event.target.error);
    };

    request.onupgradeneeded = (event) => {
        let db = event.target.result;
        if (!db.objectStoreNames.contains('sites')) {
            db.createObjectStore('sites', { keyPath: 'hostname' });
            console.log("Object store 'sites' created.");
        }
    };

    request.onsuccess = (event) => {
        let db = event.target.result;

        getTabHostname((hostname) => {

            let transaction = db.transaction("sites", "readwrite");
            let sites = transaction.objectStore("sites");

            let site = {
                hostname: hostname,
                email: 'email',
                password: 'password'
            };

            let addRequest = sites.add(site);

            addRequest.onsuccess = function () {
                console.log("Site added to the database : ", addRequest.result);
            };

            addRequest.onerror = function () {
                console.log("Error adding site", addRequest.error);
            };
        });
    };
}


function showUrl() {
    const request = indexedDB.open("db", 2);

    request.onerror = (event) => {
        console.log("Error opening the database", event.target.error);
    };

    request.onupgradeneeded = (event) => {
        let db = event.target.result;
        if (!db.objectStoreNames.contains('sites')) {
            db.createObjectStore('sites', { keyPath: 'hostname' });
            console.log("Object store 'sites' created.");
        }
    };

    request.onsuccess = (event) => {
        let db = event.target.result;

        const request = db.transaction('sites')
                   .objectStore('sites')
                   .getAll();

    request.onsuccess = ()=> {
        const sites = request.result;

        console.log('Got all the sites');
        console.table(sites)

        return sites;
    }

    request.onerror = (err)=> {
        console.error(`Error to get all sites: ${err}`)
    }
    }
}

async function getTabHostname(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        var url = new URL(tab.url)
        callback(url.hostname)
      })
}