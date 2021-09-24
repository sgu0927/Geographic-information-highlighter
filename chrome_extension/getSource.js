// let targetUrl = "https://127.0.0.1:8000/infos?sourceText=";
let show_map = true;
let show_direction = true;

function dragText() {
    // console.log("mouse move");

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
    if (dragText()) {
        displayText(dragText());
        console.log("working");
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if ("showMaps" == request.type) {
        // console.log("testtttt");
        // alert("testttt");
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
});

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
}
