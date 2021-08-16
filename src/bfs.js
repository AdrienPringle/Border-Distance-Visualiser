import { adjList, codes } from "./adj";

function bfs(initialCode) {
	let dists = Object.fromEntries(codes.map((c) => [c, -1]));
	dists[initialCode] = 0;
	let queue = [initialCode];
	while (queue.length) {
		const code = queue.pop();
		adjList[code].forEach((adj) => {
			if (dists[adj] === -1) {
				dists[adj] = dists[code] + 1;
				queue = [adj, ...queue];
			}
		});
	}
	return dists;
}

export default bfs;
