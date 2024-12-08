import {getUrlData } from './db.js';

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) { //Detect tab changes
    handleTabChange();
});

async function handleTabChange() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentHostname = new URL(tabs[0].url).hostname; //Get hostname of active tab

        getUrlData(currentHostname).then(result => { //Check if the hostname is present in the db
            if (result) {
                chrome.action.setBadgeBackgroundColor({ color: 'red'}); //Show or not the badge (notification)
                chrome.action.setBadgeTextColor({ color: 'white'});
                chrome.action.setBadgeText({ text: "1" });
            } else {
                chrome.action.setBadgeText({ text: "" });
            }
        });
    });
}
