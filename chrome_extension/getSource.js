// let targetUrl = "https://127.0.0.1:8000/infos?sourceText=";
let show_map = true;
let show_direction = true;
let show_entities = true;
let near_restaurant = true;
let near_cafe = false;
let near_convenience_store = false;
let near_gas_station = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if ("showMaps" == request.type) {
        show_map = true;
        // sendResponse("Hello");
    }
    else if ("cancelShowMaps" == request.type) {
        show_map = false;
        // sendResponse("Bye");
    }
    else if ("getDirections" == request.type) {
        show_direction = true;
    }
    else if ("cancelGetDirections" == request.type) {
        show_direction = false;
    }
    else if ("getEntities" == request.type) {
        show_entities = true;
    }
    else if ("cancelGetEntities" == request.type) {
        show_entities = false;
    }
    else if ("near_restaurant" == request.type) {
        near_restaurant = true;
        near_cafe = false;
        near_convenience_store = false;
        near_gas_station = false;
    }
    else if ("near_cafe" == request.type) {
        near_restaurant = false;
        near_cafe = true;
        near_convenience_store = false;
        near_gas_station = false;
    }
    else if ("near_convenience_store" == request.type) {
        near_restaurant = false;
        near_cafe = false;
        near_convenience_store = true;
        near_gas_station = false;
    }
    else if ("near_gas_station" == request.type) {
        near_restaurant = false;
        near_cafe = false;
        near_convenience_store = false;
        near_gas_station = true;
    }
});

function dragText() {
    let text;

    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    else if (document.selection) {
        text = document.selection.createRange().text;
    }
    return text;
}

document.onmouseup = function () {
    if (dragText() && !window.location.href.startsWith("https://127.0.0.1:8000")) {
        displayText(dragText());
        console.log("working");
    }
}

function displayText(draggedText) {

    if (show_map) {
        let match = document.getElementsByClassName('MapViewTextView');
        if (match.length > 0) {
            var children = match[0].childNodes;
            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeName == 'A') {
                    children[i].setAttribute("href", encodeURI('https://map.kakao.com/link/search/' + draggedText));
                }
            }
        }
        else {
            let newDIV = document.createElement("div");
            let newP = document.createElement("a");
            let closeButton = document.createElement("span");
            closeButton.innerHTML = "X";
            closeButton.addEventListener('click', function () {
                // 동적으로 하려면 JQuery????? 되는것 같다(우연)
                newDIV.remove();
                return;
                // 안보이게
                // this.parentElement.style.display = "none";
            });
            // closeButton.style.cursor = "pointer";
            // newP.innerHTML = draggedText + "&key=showmap";
            newP.innerHTML = "지도 검색";

            // newP.setAttribute("href", encodeURI(draggedText + "&key=showmap"));
            newP.setAttribute("href", encodeURI('https://map.kakao.com/link/search/' + draggedText));

            newP.style.zIndex = "1";
            // newP.href = draggedText + "&key=showmap";
            // newP.onclick = window.open(draggedText);

            newDIV.appendChild(closeButton);
            newDIV.appendChild(newP);

            newDIV.setAttribute("class", "MapViewTextView");
            newDIV.style.padding = "1rem";
            newDIV.style.position = "fixed";
            // newDIV.style.position = "relative";
            newDIV.style.zIndex = "1";
            newDIV.style.right = "0";
            newDIV.style.top = "150px";
            newDIV.style.textAlign = "right";
            newDIV.style.background = "#FFFFFF";
            newDIV.style.border = "2px solid #CEECF5";
            newDIV.style.borderRadius = "1em 0 1em 1em";

            document.body.appendChild(newDIV);
        }
    }
    if (show_direction) {
        let match2 = document.getElementsByClassName('DirectionTextView');
        if (match2.length > 0) {
            var children2 = match2[0].childNodes;
            for (var i = 0; i < children2.length; i++) {
                if (children2[i].nodeName == 'A') {
                    children2[i].setAttribute("href", encodeURI('https://127.0.0.1:8000/infos?sourceText=' + draggedText));
                }
            }
        }
        else {
            let newDIV2 = document.createElement("div");
            let newP2 = document.createElement("a");
            let closeButton2 = document.createElement("span");
            closeButton2.innerHTML = "X";
            closeButton2.addEventListener('click', function () {
                newDIV2.remove();
                return;
            });

            newP2.innerHTML = "길찾기";
            newP2.setAttribute("href", encodeURI('https://127.0.0.1:8000/infos?sourceText=' + draggedText));

            newP2.style.zIndex = "1";

            newDIV2.appendChild(closeButton2);
            newDIV2.appendChild(newP2);

            newDIV2.setAttribute("class", "DirectionTextView");
            newDIV2.style.padding = "1rem";
            newDIV2.style.position = "fixed";
            newDIV2.style.zIndex = "1";
            newDIV2.style.right = "0";
            newDIV2.style.top = "200px";
            newDIV2.style.textAlign = "right";
            newDIV2.style.background = "#FFFFFF";
            newDIV2.style.border = "2px solid #CEECF5";
            newDIV2.style.borderRadius = "1em 0 1em 1em";

            document.body.appendChild(newDIV2);
        }
    }

    if (show_entities) {
        let match3 = document.getElementsByClassName('EntitiesTextView');
        if (match3.length > 0) {
            var children3 = match3[0].childNodes;
            for (var i = 0; i < children3.length; i++) {
                if (children3[i].nodeName == 'A') {
                    let code = "";
                    if (near_restaurant) {
                        code = "FD6";
                    } else if (near_cafe) {
                        code = "CE7";
                    } else if (near_convenience_store) {
                        code = "CS2";
                    } else if (near_gas_station) {
                        code = "OL7";
                    }
                    children3[i].setAttribute("href", encodeURI('https://127.0.0.1:8000/infos?sourceText=' + draggedText + '&code=' + code.toString()));
                }
            }
        }
        else {
            let newDIV3 = document.createElement("div");
            let newP3 = document.createElement("a");
            let closeButton3 = document.createElement("span");
            closeButton3.innerHTML = "X";
            closeButton3.addEventListener('click', function () {
                // 동적으로 하려면 JQuery????? 되는것 같다(우연)
                newDIV3.remove();
                return;
                // 안보이게
                // this.parentElement.style.display = "none";
            });
            // closeButton.style.cursor = "pointer";
            // newP.innerHTML = draggedText + "&key=showmap";
            newP3.innerHTML = "주변 시설 검색";

            let code = "";
            if (near_restaurant) {
                code = "FD6";
            } else if (near_cafe) {
                code = "CE7";
            } else if (near_convenience_store) {
                code = "CS2";
            } else if (near_gas_station) {
                code = "OL7";
            }
            newP3.setAttribute("href", encodeURI('https://127.0.0.1:8000/infos?sourceText=' + draggedText + '&code=' + code.toString()));

            newP3.style.zIndex = "1";

            newDIV3.appendChild(closeButton3);
            newDIV3.appendChild(newP3);

            newDIV3.setAttribute("class", "EntitiesTextView");
            newDIV3.style.padding = "1rem";
            newDIV3.style.position = "fixed";
            newDIV3.style.zIndex = "1";
            newDIV3.style.right = "0";
            newDIV3.style.top = "250px";
            newDIV3.style.textAlign = "right";
            newDIV3.style.background = "#FFFFFF";
            newDIV3.style.border = "2px solid #CEECF5";
            newDIV3.style.borderRadius = "1em 0 1em 1em";

            document.body.appendChild(newDIV3);
        }
    }
}
