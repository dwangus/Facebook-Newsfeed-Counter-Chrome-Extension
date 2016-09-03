var activated = true;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	sendResponse({bool: activated});
});

chrome.browserAction.onClicked.addListener(function(tab) {
	activated = !activated;
	if (activated) {
		chrome.browserAction.setIcon({
			path: {
				32: "../icons/nfc-32.png",
				38: "../icons/nfc-38.png"
			}
		}, function () {
			chrome.browserAction.setTitle({title: 'Click to deactivate Facebook Newsfeed-Counter'});
			chrome.tabs.query({}, function(tabs) {
				var message = {bool: activated};
				for (var i=0; i<tabs.length; ++i) {
					chrome.tabs.sendMessage(tabs[i].id, message);
				}
			});
		});
	} else {
		chrome.browserAction.setIcon({
			path: {
				32: "../icons/nfc-32-deac.png",
				38: "../icons/nfc-38-deac.png"
			}
		}, function () {
			chrome.browserAction.setTitle({title: 'Click to activate Facebook Newsfeed-Counter'});
			chrome.tabs.query({}, function(tabs) {
				var message = {bool: activated};
				for (var i=0; i<tabs.length; ++i) {
					chrome.tabs.sendMessage(tabs[i].id, message);
				}
			});
		});
	}
});