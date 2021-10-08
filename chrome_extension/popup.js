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

    if (document.getElementById("checkboxShowMaps").checked) {
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
    if (document.getElementById("checkboxGetDirections").checked) {
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
    if (document.getElementById("checkboxGetEntities").checked) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "getEntities" }, function (response) {
                //alert(response);
            });
        });
    }
    else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "cancelGetEntities" }, function (response) {
                //alert(response);
            });
        });
    }
    if (document.getElementById("restaurant").checked) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "near_restaurant" }, function (response) {
                //alert(response);
            });
        });
    }
    if (document.getElementById("cafe").checked) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "near_cafe" }, function (response) {
                //alert(response);
            });
        });
    }
    if (document.getElementById("convenience_store").checked) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "near_convenience_store" }, function (response) {
                //alert(response);
            });
        });
    }
    if (document.getElementById("gas_station").checked) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "near_gas_station" }, function (response) {
                //alert(response);
            });
        });
    }

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

    document.getElementById("checkboxGetEntities").addEventListener("change", function () {
        if (this.checked) {
            // 처음에 바로 안되는 것 reload되서 그런 듯
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "getEntities" }, function (response) {
                    //alert(response);
                });
            });
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "cancelGetEntities" }, function (response) {
                    //alert(response);
                });
            });
        }
    });

    document.getElementById("restaurant").addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "near_restaurant" }, function (response) {
                //alert(response);
            });
        });
    });
    document.getElementById("cafe").addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "near_cafe" }, function (response) {
                //alert(response);
            });
        });
    });
    document.getElementById("convenience_store").addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "near_convenience_store" }, function (response) {
                //alert(response);
            });
        });
    });
    document.getElementById("gas_station").addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "near_gas_station" }, function (response) {
                //alert(response);
            });
        });
    });
});
