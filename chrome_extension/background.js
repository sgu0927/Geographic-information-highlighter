console.log("background running");

// let targetUrl = "https://127.0.0.1:8000/infos/";

// function __onWindowLoad() {
//     // console.log(document.body.innerText);
//     chrome.extension.onMessage.addListener(function (request, sender) {
//         if (request.action == "getSource") {
//             // document.body.innerText = request.source;
//             // var csrftoken = getCookie('csrftoken');
//             // fetch(targetUrl, {
//             //     method: 'POST',
//             //     // mode: 'cors',
//             //     headers: {
//             //         'Content-Type': 'application/json'
//             //         // "Access-Control-Allow-Origin": "*"
//             //     },
//             //     body: JSON.stringify({
//             //         sourceText: request.source,
//             //         key: "highlight",
//             //         userId: 1,
//             //     }),
//             // })
//             //     .then((response) => {
//             //         // console.log(response.clone().text());
//             //         // console.log(response.clone().json());

//             //         // console.log(response);
//             //         // console.log(response.json());
//             //         // console.log("response done !");
//             //         return response.json();
//             //         // return response.text();
//             //         // return response.json();
//             //         // response.json();
//             //         // console.log("response : ", response.text());
//             //         // console.log(url);
//             //         // displayText(url);
//             //         // displayText(url.substring(0, url.length - 12));
//             //         // return response.text();
//             //     })
//             //     .then((data) => {
//             //         // displayText(data);
//             //         console.log(data);
//             //         // var parser = new DOMParser();
//             //         // var doc = parser.parseFromString(data, 'text/html');
//             //     })
//             //     .catch((error) => console.log(error));
//         }
//     });

//     function onWindowLoad() {
//         // console.log("2");
//         chrome.tabs.executeScript(null, {
//             file: "getSource.js"
//         }, function () {
//             if (chrome.extension.lastError) {
//                 // document.body.innerText = 'Error : \n' + chrome.extension.lastError.message;
//                 // console.log(chrome.extension.lastError.message);
//                 // console.log("14");
//             }
//         });
//         // console.log("13");
//     }

//     window.onload = onWindowLoad;
// }

//////////////////////////////// addd
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if ("getOptions" == request.message) {
//         if ("undefined" != typeof localStorage) {
//             chrome.tabs.query({
//                 "active": true,
//                 "currentWindow": true
//             },
//                 function (tabs) {
//                     if ("undefined" != typeof tabs[0].id && tabs[0].id) {
//                         var showOccurrences = localStorage.getItem("showOccurrences");
//                         showOccurrences = "true" == showOccurrences || null == showOccurrences;

//                         var showMaps = localStorage.getItem("showMaps");
//                         showMaps = "true" == showMaps || null == showMaps;

//                         var getDirections = localStorage.getItem("getDirections");
//                         getDirections = "true" == getDirections || null == getDirections;

//                         chrome.tabs.sendMessage(tabs[0].id, {
//                             "message": "returnOptions",
//                             "remove": request.remove,
//                             "keywords": localStorage.getItem("keywords"),
//                             "foreground": localStorage.getItem("foreground") || "#000000",
//                             "background": localStorage.getItem("background") || "#ffff00",
//                             "showOccurrences": showOccurrences,
//                             "showMaps": showMaps,
//                             "getDirections": getDirections
//                         });
//                     }
//                 }
//             );
//         }
//     }
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if ("showOccurrences" == request.message) {
//         var showOccurrences = localStorage.getItem("showOccurrences");
//         showOccurrences = "true" == showOccurrences || null == showOccurrences;

//         chrome.browserAction.setBadgeText({
//             "text": showOccurrences && request.occurrences ? String(request.occurrences) : "",
//             "tabId": sender.tab.id
//         });
//     }
// });

//////////////////////////////// addd


// __onWindowLoad();