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
				chrome.devtools.inspectedWindow.eval("SiebelApp.S_App.GetActiveView().GetName()", (s) => {
					let app = document.getElementById("app");
					let viewDetail = document.createElement("details");
					viewDetail.id = "view";
					let viewSumm = document.createElement("summary");
					let p = document.createElement("p");
					p.id = "viewp";
					p.innerText = "";
					viewSumm.innerText = s;
					viewDetail.appendChild(viewSumm);
					viewDetail.appendChild(p);
					app.appendChild(viewDetail);
				});
				chrome.devtools.inspectedWindow.eval("SiebelApp.S_App.GetActiveView().GetBusObj().GetName()", (s) => {
					let viewp = document.getElementById("viewp");
					viewp.innerHTML = "<strong>BusObject: </strong>" + s;
				});
				chrome.devtools.inspectedWindow.eval("SiebelApp.S_App.GetActiveView().GetAppletMap()", (s) => {
					let objKeys = Object.keys(s);
					for(var i=0; i<objKeys.length; i++) {
						var view = document.getElementById("view");
						var appletDetail = document.createElement("details");
						appletDetail.id = "applet-" + i;
						appletDetail.classList.add("applet");
						var appletSumm = document.createElement("summary");
						appletSumm.innerText = objKeys[i];
						var p = document.createElement("p");
						p.id = appletDetail.id + "-p-" + i;
						
						appletDetail.appendChild(appletSumm);
						appletDetail.appendChild(p);
						view.appendChild(appletDetail);
					}
				});
				
				var applets = document.querySelectorAll("applet");
				applets.forEach((a) => {
					// TODO: get applet's child p's ID
				});
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
