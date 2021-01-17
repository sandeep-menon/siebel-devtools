var tab = chrome.devtools.inspectedWindow.tabId;

function handleResponse(result, isException) {
	if(isException != undefined) {
		chrome.devtools.inspectedWindow.eval("console.warn('There was some error, try reloading the Siebel DevTools extension.')");
		let app = document.getElementById("app");
		let elem = document.createElement("blockquote");
		elem.innerText = "This doesn't seem to be a Siebel Web Application.";
		app.appendChild(elem);
    } else {
		try {
			let activeView = result;
			if(activeView != null) {
				let viewPromise = new Promise(function(resolve, reject) {
					chrome.devtools.inspectedWindow.eval("SiebelApp.S_App.GetActiveView().GetName()", (s) => {
						return resolve(s);
					});
				}).then((value) => {
					let app = document.getElementById("app");
					let viewDetail = document.createElement("details");
					viewDetail.id = "view";
					let viewSumm = document.createElement("summary");
					let viewP = document.createElement("p");
					viewP.id = "viewp";
					viewSumm.innerText = value;
					viewDetail.appendChild(viewSumm);
					viewDetail.appendChild(viewP);
					app.appendChild(viewDetail);
					
					// getting view details
					let busObjPromise = new Promise(function(resolve, reject) {
						chrome.devtools.inspectedWindow.eval("SiebelApp.S_App.GetActiveView().GetBusObj().GetName()", (s) => {
							return resolve(s);
						});
					}).then((value) => {
						let viewp = document.getElementById("viewp");
						viewp.innerHTML = "<strong>BusObject: </strong>" + value;
						let appletPromise = new Promise(function(resolve, reject) {
							chrome.devtools.inspectedWindow.eval("Object.keys(SiebelApp.S_App.GetActiveView().GetAppletMap())", (s) => {
								return resolve(s);
							});
						}).then((value) => {
							let appletKeys = value;
							for(var i=0; i<appletKeys.length; i++) {
								let view = document.getElementById("view");
								let appletDetail = document.createElement("details");
								appletDetail.id = "applet-" + i;
								appletDetail.classList.add("applet");
								let appletSumm = document.createElement("summary");
								appletSumm.innerText = appletKeys[i];
								var appletP = document.createElement("p");
								appletP.id = appletDetail.id + "-p";
								appletDetail.appendChild(appletSumm);
								appletDetail.appendChild(appletP);
								view.appendChild(appletDetail);
							}
						});
					});
				});
				// TODO:
				// onclick of applet summary, fetch that applets details
				// like RecordSet, BusCompName etc.
			}
		} catch(e) {
			console.error("There was some error, try reloading the Siebel DevTools extension.");
			console.error(e);
		} finally {
			// nothing to do
		}
    }
}

chrome.devtools.inspectedWindow.eval(
  "SiebelApp.S_App.GetActiveView()",
  handleResponse
);


var refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", () => {
	location.reload();
});
