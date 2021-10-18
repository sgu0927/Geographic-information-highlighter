let geo_infos = [];
var source_body;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if ("sourceTextReady" == request.type) {
        if ("undefined" != typeof request.source_body && "null" != typeof request.source_body) {
            fetch("http://127.0.0.1:8000/infos/", {
                // fetch("http://jhubdb.hanyang.ac.kr:52000/infos/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sourceText: request.source_body,
                    key: "highlight",
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let arr = data['NER_result'];
                    console.log("NER_result: ", arr);
                    if (typeof arr !== 'undefined' && arr !== 'None') {
                        for (var i = 0; i < arr.length; i++) {
                            geo_infos.push(arr[i]);
                        }
                        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                            chrome.tabs.sendMessage(tabs[0].id, { type: "keywordsHighlight", LOC_tags: geo_infos }, function (response) {
                                //alert(response);
                            });
                        });
                    }
                })
                .catch((error) => console.log(error));
        }
    }
});
