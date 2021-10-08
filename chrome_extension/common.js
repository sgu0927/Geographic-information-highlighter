function loadOptions() {
	if ("undefined" != typeof localStorage) {
		// document.getElementById("textareaKeywords").value = localStorage.getItem("keywords");
		// document.getElementById("colorForeground").value = localStorage.getItem("foreground") || "#000000";
		// document.getElementById("colorBackground").value = localStorage.getItem("background") || "#ffff00";

		// var showOccurrences = localStorage.getItem("showOccurrences");
		// showOccurrences = "true" == showOccurrences || null == showOccurrences;
		// document.getElementById("checkboxShowOccurrences").checked = showOccurrences;

		var showMaps = localStorage.getItem("showMaps");
		showMaps = "true" == showMaps || null == showMaps;
		document.getElementById("checkboxShowMaps").checked = showMaps;

		var getDirections = localStorage.getItem("getDirections");
		getDirections = "true" == getDirections || null == getDirections;
		document.getElementById("checkboxGetDirections").checked = getDirections;

		var getEntities = localStorage.getItem("getEntities");
		getEntities = "true" == getEntities || null == getEntities;
		document.getElementById("checkboxGetEntities").checked = getEntities;

		var near_restaurant = localStorage.getItem("near_restaurant");
		var near_cafe = localStorage.getItem("near_cafe");
		var near_convenience_store = localStorage.getItem("near_convenience_store");
		var near_gas_station = localStorage.getItem("near_gas_station");

		if (near_cafe != "true" && near_convenience_store != "true" && near_gas_station != "true") {
			near_restaurant = "true";
		}
		else {
			near_restaurant = null;
		}
		document.getElementById("restaurant").checked = near_restaurant;

		if (near_restaurant != "true" && near_convenience_store != "true" && near_gas_station != "true") {
			near_cafe = "true";
		}
		else {
			near_cafe = null;
		}
		document.getElementById("cafe").checked = near_cafe;

		if (near_restaurant != "true" && near_cafe != "true" && near_gas_station != "true") {
			near_convenience_store = "true";
		}
		else {
			near_convenience_store = null;
		}
		document.getElementById("convenience_store").checked = near_convenience_store;

		if (near_restaurant != "true" && near_cafe != "true" && near_convenience_store != "true") {
			near_gas_station = "true";
		}
		else {
			near_gas_station = null;
		}
		document.getElementById("gas_station").checked = near_gas_station;
	}
}

function saveOptions() {
	if ("undefined" != typeof localStorage) {
		// localStorage.setItem("keywords", document.getElementById("textareaKeywords").value);
		// localStorage.setItem("foreground", document.getElementById("colorForeground").value);
		// localStorage.setItem("background", document.getElementById("colorBackground").value);
		// localStorage.setItem("showOccurrences", document.getElementById("checkboxShowOccurrences").checked);
		localStorage.setItem("showMaps", document.getElementById("checkboxShowMaps").checked);
		localStorage.setItem("getDirections", document.getElementById("checkboxGetDirections").checked);
		localStorage.setItem("getEntities", document.getElementById("checkboxGetEntities").checked);
		localStorage.setItem("near_restaurant", document.getElementById("restaurant").checked);
		localStorage.setItem("near_cafe", document.getElementById("cafe").checked);
		localStorage.setItem("near_convenience_store", document.getElementById("convenience_store").checked);
		localStorage.setItem("near_gas_station", document.getElementById("gas_station").checked);
	}
}
