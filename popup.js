
console.log("running")

function updateStatusText() {
    document.getElementById('status-text').textContent = isEnabled ? 'Status: On' : 'Status: Off';
}

chrome.storage.local.get('isEnabled', function(data) {
    isEnabled = data.isEnabled ? data.isEnabled : false;
    isEnabled = !isEnabled; // Toggle the status
    console.log("enabling")
    console.log(isEnabled)
    let status = {
        'www.instagram.com': isEnabled,
    };
    chrome.storage.local.set({isEnabled: status});
    updateStatusText();
});


function toggleStatus() {
    console.log("toggling");
}