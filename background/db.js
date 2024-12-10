function getUrlData(hostname){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("db", 2);

        request.onerror = (event) => {
            reject(event.target.error);
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
                    resolve(request.result);
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

function addUrl(hostname, email, password) {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open("db", 2);

        request.onerror = (event) => {
            reject(event.target.error);
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

            let transaction = db.transaction("sites", "readwrite");
            let sites = transaction.objectStore("sites");

            let site = {
                hostname: hostname,
                email: email,
                password: password
            };

            let addRequest = sites.add(site);

            addRequest.onsuccess = function () {
                resolve();
            };

            addRequest.onerror = function () {
                reject(addRequest.error.message)
            };
        };
    });
}

async function getAllLogins(){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("db", 2);
    
        request.onerror = (event) => {
            reject(event.target.error);
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
                console.table(sites);
                resolve(sites);
            }

            request.onerror = (err)=> {
                reject(err.message);
            }
        }
    });
}

function removeDB() {
    return new Promise((resolve, reject) => {
        window.indexedDB.databases().then((r) => {
            for (var i = 0; i < r.length; i++) window.indexedDB.deleteDatabase(r[i].name);
        }).then(() => {
            resolve();
        });
    });
}

export {
    addUrl,
    getAllLogins,
    removeDB,
    getUrlData
};
