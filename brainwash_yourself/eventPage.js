chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.sync.get('state', function(data) {
		if (data.state === 'on') {
			chrome.storage.sync.set({state: 'off'});
        	chrome.browserAction.setIcon({path: "icon-off.png"});
		} else {
			chrome.storage.sync.set({state: 'on'});
    		chrome.browserAction.setIcon({path: "icon.png"});
		}
	});
});