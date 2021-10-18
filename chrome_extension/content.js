let geo_infos = [];
let prev = "";
let serverUrl = "http://127.0.0.1:8000";
// let serverUrl = "http://jhubdb.hanyang.ac.kr:52000";

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



if (!window.location.href.startsWith(serverUrl) && !window.location.href.startsWith("https://map.kakao.com/")) {
	var cur_text = document.body.innerText;
	if (prev != cur_text && cur_text !== '' && !cur_text.startsWith('function()')
		&& !cur_text.startsWith('(function') && !cur_text.startsWith('/**') && !cur_text.startsWith('\n(function')) {

		if ("undefined" != typeof localStorage && "undefined" != typeof cur_text) {
			chrome.runtime.sendMessage({
				type: "sourceTextReady",
				source_body: cur_text
			});

			prev = cur_text;
		} else {
			console.log(typeof localStorage, typeof cur_text);
		}
	}
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if ("keywordsHighlight" == request.type) {
		if ("undefined" != typeof request.LOC_tags) {
			keywordsHighlighter({
				"keywords": request.LOC_tags,
				"foreground": "#000000",
				"background": "#ffff00"
			},
				false
			);
		}
	}
});