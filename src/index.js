import Datamap from "../node_modules/datamaps/dist/datamaps.world.min.js";

import "./index.css";
// import Datamap from "./datamaps/datamaps.world.min.js";

import bfs from "./bfs";
import { codes } from "./adj";
import isoMap from "./iso3.json";
import countryNames from "./names.json";

const hash = window.location.hash.substring(1);
const defaultCountry = codes.includes(hash) ? hash : "BD";

function getData(code) {
	return Object.fromEntries(
		Object.entries(bfs(code)).map(([code, distance], i) => [
			isoMap[code],
			{
				fillKey: distance > 7 ? "defaultFill" : "" + distance,
			},
		])
	);
}
function updateCountryText(code) {
	document
		.querySelectorAll(".country")
		.forEach((e) => (e.innerText = countryNames[code]));
}

const fills = {
	0: "#35ae55",
	1: "#b5e51d",
	2: "#fef200",
	3: "#ff7f26",
	4: "#ec1b25",
	5: "#9f4d9a",
	6: "#3d48cd",
	7: "#04a5e5",
	"-1": "#dddddd",
	defaultFill: "#dddddd",
};

var map = new Datamap({
	element: document.getElementById("container"),
	fills,
	responsive: true,
	data: getData(defaultCountry),
	geographyConfig: {
		highlightOnHover: false,
		popupOnHover: false,
		borderColor: "#000",
	},
	done: function (datamap) {
		datamap.svg
			.selectAll(".datamaps-subunit")
			.on("click", function (geography) {
				const code = isoMap[geography.id];
				const newData = getData(code);
				datamap.updateChoropleth(newData);
				// window.location.hash = "#" + code;
				window.history.replaceState(null, "", "#" + code);
				updateCountryText(code);
			});
	},
});

window.addEventListener("resize", function () {
	map.resize();
});

updateCountryText(defaultCountry);
