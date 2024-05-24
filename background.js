// background.js
let sitesAndRedirects = {
    'www.instagram.com': ['/direct/', '/direct/inbox'],
};

// background.js

chrome.storage.sync.get('isEnabled', function(data) {
    if (data.isEnabled === undefined) {
        chrome.storage.sync.set({ isEnabled: true });
    } else {
        isEnabled = data.isEnabled;
    }
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        const url = new URL(changeInfo.url);
        const path = url.pathname;

        Object.keys(sitesAndRedirects).forEach(site => {
            if (url.host === site && !path.startsWith(sitesAndRedirects[site][0]) && isEnabled) {
                chrome.tabs.update(tabId, {url: `https://${site}${sitesAndRedirects[site][1]}`});
            }
        });
    }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.isEnabled) {
        isEnabled = changes.isEnabled.newValue;
    }
});


