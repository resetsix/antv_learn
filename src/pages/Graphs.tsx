import { Graph } from "@antv/x6";
import { useMount } from "ahooks";
import { useEffect, useRef, useState } from "react";

const data = {
	nodes: [
		{
			id: "node1",
			label: "Node 1",
			shape: "custom-node-width-port",
			width: 80,
			height: 30,
			x: 200,
			y: 100,
			ports: {
				items: [
					{
						id: "port_1",
						group: "bottom",
					},
					{
						id: "port_2",
						group: "bottom",
					},
				],
			},
		},
		{
			id: "node2",
			label: "Node 2",
			shape: "custom-node-width-port",
			width: 80,
			height: 30,
			x: 100,
			y: 200,
			ports: {
				items: [
					{
						id: "port_3",
						group: "top",
					},
					{
						id: "port_4",
						group: "top",
					},
				],
			},
		},
		{
			id: "node3",
			label: "Node 3",
			width: 80,
			shape: "custom-node-width-port",
			height: 30,
			x: 300,
			y: 200,
		},
	],
	edges: [
		{
			source: "node1",
			target: "node2",
		},
		{
			source: "node1",
			target: "node3",
		},
	],
};

Graph.registerNode(
	"custom-node-width-port",
	{
		inherit: "rect",
		width: 100,
		height: 40,
		attrs: {
			body: {
				stroke: "#8f8f8f",
				strokeWidth: 1,
				fill: "#fff",
				rx: 6,
				ry: 6,
			},
		},
		ports: {
			groups: {
				top: {
					position: "top",
					attrs: {
						circle: {
							magnet: true,
							stroke: "#8f8f8f",
							r: 5,
						},
					},
				},
				bottom: {
					position: "bottom",
					attrs: {
						circle: {
							magnet: true,
							stroke: "#8f8f8f",
							r: 5,
						},
					},
				},
			},
		},
	},
	true
);
export const Graphs = () => {
	const ref = useRef<Graph | null>(null);
	const [size, setSize] = useState<number>(30);

	useMount(() => {
		const graph = new Graph({
			// grid: true,
			// background: {
			// 	color: "#bfa",
			// },
			container: document.getElementById("container")!,
			grid: {
				size: size,
				visible: true,
				type: "doubleMesh",
			},
			panning: true,

			mousewheel: {
				enabled: true,
				modifiers: "Ctrl",
				maxScale: 4,
				minScale: 0.2,
			},
		});
		// 改变节点大小
		// graph.resize(800, 600);

		graph.fromJSON(data);
		graph.centerContent();
		ref.current = graph;
	});

	useEffect(() => {
		if (ref.current) {
			ref.current.setGridSize(size);
		}
	}, [size]);

	return (
		<div style={{ width: "100vw", height: "calc(100vh - 58px)" }}>
			<button onClick={() => setSize(10)}>修改为10</button>
			<button onClick={() => setSize(50)}>修改为50</button>
			<div id="container" style={{ width: "100%", height: "100%" }}></div>
		</div>
	);
};
