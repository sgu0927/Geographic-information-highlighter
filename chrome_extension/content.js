let geo_infos = [];

function keywordsHighlighter(options, remove) {
	var occurrences = 0;

	// Based on "highlight: JavaScript text higlighting jQuery plugin" by Johann Burkard.
	// http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
	// MIT license.
	function highlight(node, pos, keyword, options) {
		var span = document.createElement("span");
		span.className = "highlighted";
		span.style.color = options.foreground;
		span.style.backgroundColor = options.background;

		var highlighted = node.splitText(pos);
		/*var afterHighlighted = */highlighted.splitText(keyword.length);
		var highlightedClone = highlighted.cloneNode(true);

		span.appendChild(highlightedClone);
		highlighted.parentNode.replaceChild(span, highlighted);

		occurrences++;
	}

	function addHighlights(node, keywords, options) {
		var skip = 0;

		var i;
		if (3 == node.nodeType) {
			for (i = 0; i < keywords.length; i++) {
				var keyword = keywords[i].toLowerCase();
				var pos = node.data.toLowerCase().indexOf(keyword);
				if (0 <= pos) {
					highlight(node, pos, keyword, options);
					skip = 1;
				}
			}
		}
		else if (1 == node.nodeType && !/(script|style|textarea)/i.test(node.tagName) && node.childNodes) {
			for (i = 0; i < node.childNodes.length; i++) {
				i += addHighlights(node.childNodes[i], keywords, options);
			}
		}

		return skip;
	}

	function removeHighlights(node) {
		var span;
		while (span = node.querySelector("span.highlighted")) {
			span.outerHTML = span.innerHTML;
		}

		occurrences = 0;
	}

	if (remove) {
		removeHighlights(document.body);
	}

	// var keywords = options.keywords.split(",");
	// delete options.keywords;
	// addHighlights(document.body, keywords, options);
	addHighlights(document.body, options.keywords, options);
}

fetch("https://127.0.0.1:8000/infos/", {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		sourceText: document.body.innerText,
		key: "highlight",
		userId: 1,
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
			keywordsHighlighter({
				"keywords": geo_infos,
				"foreground": "#000000",
				"background": "#ffff00"
			},
				false
			);
		}
	})
	.catch((error) => console.log(error));

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	if ("returnOptions" == request.message) {
// 		keywordsHighlighter({
// 			"keywords": geo_infos,
// 			"foreground": request.foreground,
// 			"background": request.background
// 		},
// 			request.remove
// 		);
// 		// if ("undefined" != typeof request.keywords && request.keywords) {
// 		// 	keywordsHighlighter({
// 		// 		"keywords": geo_infos,
// 		// 		"foreground": request.foreground,
// 		// 		"background": request.background
// 		// 	},
// 		// 		request.remove
// 		// 	);
// 		// }
// 	}
// });

// chrome.runtime.sendMessage({
// 	"message": "getOptions",
// 	"remove": false
// });
