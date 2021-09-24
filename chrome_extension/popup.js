// DOMContentLoaded 이벤트는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생
document.addEventListener("DOMContentLoaded", function () {
    loadOptions();
    document.getElementById("buttonCancel").addEventListener("click", function () {
        window.close();
    });

    document.getElementById("buttonSave").addEventListener("click", function () {
        saveOptions();
        window.close();

        // chrome.runtime.sendMessage({
        //     "message": "getOptions",
        //     "remove": true
        // });
    });

    document.getElementById("checkboxShowMaps").addEventListener("change", function () {
        if (this.checked) {
            // 처음에 바로 안되는 것 reload되서 그런 듯
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "showMaps" }, function (response) {
                    //alert(response);
                });
            });
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "cancelShowMaps" }, function (response) {
                    //alert(response);
                });
            });
        }
    });

    document.getElementById("checkboxGetDirections").addEventListener("change", function () {
        if (this.checked) {
            // 처음에 바로 안되는 것 reload되서 그런 듯
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "getDirections" }, function (response) {
                    //alert(response);
                });
            });
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "cancelGetDirections" }, function (response) {
                    //alert(response);
                });
            });
        }
    });
});