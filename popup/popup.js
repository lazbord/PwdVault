document.addEventListener("DOMContentLoaded", () => {
    const button1 = document.getElementById("store-url-button");
    const button2 = document.getElementById("test-url-button");

    button1.addEventListener("click", () => {
        storeUrl();
    });

    button2.addEventListener("click", () => {
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
        let db = event.target.result; // Use event.target.result instead of request.result here
        if (!db.objectStoreNames.contains('sites')) {
            db.createObjectStore('sites', { keyPath: 'hostname' });
            console.log("Object store 'sites' created.");
        }
    };

    request.onsuccess = (event) => {
        let db = event.target.result;

        let transaction = db.transaction("sites", "readwrite");
        let sites = transaction.objectStore("sites");

        let site = {
            hostname: 'test',
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
    };
}

function showUrl() {

}
