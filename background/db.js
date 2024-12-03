export async function checkUrl(hostname) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("db", 2);

        request.onerror = (event) => {
            console.log("Error opening the database", event.target.error);
            reject(false);
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
                        .get(hostname);

            request.onsuccess = () => {
                if (request.result) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            };

            request.onerror = (err) => {
                console.log("Error checking the hostname in the DB:", err);
                resolve(false);
            };
        };
    });
}





















// function addUrl() {
//     const request = indexedDB.open("db", 2);

//     request.onerror = (event) => {
//         console.log("Error opening the database", event.target.error);
//     };

//     request.onupgradeneeded = (event) => {
//         let db = event.target.result;
//         if (!db.objectStoreNames.contains('sites')) {
//             db.createObjectStore('sites', { keyPath: 'hostname' });
//             console.log("Object store 'sites' created.");
//         }
//     };

//     request.onsuccess = (event) => {
//         let db = event.target.result;

//         getTabHostname((hostname) => {

//             let transaction = db.transaction("sites", "readwrite");
//             let sites = transaction.objectStore("sites");

//             let site = {
//                 hostname: hostname,
//                 email: 'email',
//                 password: 'password'
//             };

//             let addRequest = sites.add(site);

//             addRequest.onsuccess = function () {
//                 console.log("Site added to the database : ", addRequest.result);
//             };

//             addRequest.onerror = function () {
//                 console.log("Error adding site", addRequest.error);
//             };
//         });
//     };
// }

// async function checkUrl(hostname) {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open("db", 2);

//         request.onerror = (event) => {
//             console.log("Error opening the database", event.target.error);
//             reject(false); // Si une erreur se produit, rejeter la promesse
//         };

//         request.onupgradeneeded = (event) => {
//             let db = event.target.result;
//             if (!db.objectStoreNames.contains('sites')) {
//                 db.createObjectStore('sites', { keyPath: 'hostname' });
//                 console.log("Object store 'sites' created.");
//             }
//         };

//         request.onsuccess = (event) => {
//             let db = event.target.result;

//             const request = db.transaction('sites')
//                         .objectStore('sites')
//                         .get(hostname);

//             request.onsuccess = () => {
//                 if (request.result) {
//                     resolve(true); // Si le site est trouvé
//                 } else {
//                     resolve(false); // Si le site n'est pas trouvé
//                 }
//             };

//             request.onerror = (err) => {
//                 console.log("Error checking the hostname in the DB:", err);
//                 resolve(false); // Si une erreur se produit dans la vérification
//             };
//         };
//     });
// }

// chrome.runtime.onConnect.addListener(function(port) {
//     console.log("Connexion établie avec le background");

//     port.onMessage.addListener(function(request) {
//         if (request.action === "callDb" && request.hostname) {
//             // Vérifie l'URL dans la base de données (assurez-vous que la fonction checkUrl est définie)
//             checkUrl(request.hostname).then(result => {
//                 port.postMessage({ boolean: result });
//             }).catch(() => {
//                 port.postMessage({ boolean: false });
//             });
//         }
//     });
// });




// function removeDB() {
//     window.indexedDB.databases().then((r) => {
//         for (var i = 0; i < r.length; i++) window.indexedDB.deleteDatabase(r[i].name);
//     }).then(() => {
//         console.log("All data cleared");
//     });
// }
