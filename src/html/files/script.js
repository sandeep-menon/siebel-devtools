function handleResponse(result, isException) {
	if(isException != undefined) {
        console.warn("There was some error, try reloading the Siebel DevTools extension.");
    } else {
        let keys = Object.keys(result);
        for (let i=0; i<keys.length; i++) {
            let elem = document.createElement("div");
            elem.innerText = result[keys[i]];
            document.body.append(elem);
        }
    }
}

var tab = chrome.devtools.inspectedWindow.tabId;
chrome.devtools.inspectedWindow.eval(
  "document.myobject",
  handleResponse
);


// run this in console:
/*
document.myobject = {};
document.myobject["key1"] = "value1";
document.myobject["key2"] = "value2";
document.myobject["key3"] = {"key31": "value31", "key32": "value32", "key33": "value33"};
document.myobject["key4"] = "value4";
*/