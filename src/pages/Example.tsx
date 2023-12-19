import React, { useRef } from "react";
import { Graph } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Stencil } from "@antv/x6-plugin-stencil";
import { useMount } from "ahooks";

const commonAttrs = {
	// body: {
	// 	fill: "#fff",
	// 	stroke: "#8f8f8f",
	// 	strokeWidth: 1,
	// },
	body: {
		stroke: "#8f8f8f",
		strokeWidth: 1,
		fill: "#fff",
		rx: 6,
		ry: 6,
	},
	img: {
		"xlink:href":
			"https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
		width: 16,
		height: 16,
		x: 12,
		y: 12,
	},
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

const data = {
	nodes: [
		{
			id: "node1",
			x: 130,
			y: 30,
			shape: "custom-node-width-port",
			width: 80,
			height: 40,
			label: "Hello",
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
			x: 320,
			y: 240,
			shape: "custom-node-width-port",
			width: 100,
			height: 40,
			label: "World",
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
	],
	edges: [
		{
			source: { cell: "node1", port: "port_2" },
			target: { cell: "node2", port: "port_3" },
			attrs: {
				line: {
					stroke: "#8f8f8f",
					strokeWidth: 1,
				},
			},
		},
	],
};

export const Example = () => {
	const container = useRef<HTMLDivElement | null>(null);
	const stencilContainer = useRef<HTMLDivElement | null>(null);

	useMount(() => {
		// 创建一个Graph实例
		const graph = new Graph({
			container: container.current!, // 使用容器的引用
			background: {
				color: "#F2F7FA", // 设置背景颜色
			},
		});

		// 使用 Snapline（对齐线） 插件
		graph.use(
			new Snapline({
				enabled: true, // 启用插件
				sharp: true, // 设置插件的属性
			})
		);

		graph.fromJSON(data);

		// 创建一个 Stencil（类似侧边栏导航UI） 实例
		const stencil = new Stencil({
			title: "大数据组件导航",
			target: graph,
			search(cell, keyword) {
				return cell.shape.indexOf(keyword) !== -1;
			},
			placeholder: "请输入组件名称",
			notFoundText: "没有找到相关组件",
			// collapsable: true,
			stencilGraphHeight: 0,
			layoutOptions: {
				columns: 1,
			},
			groups: [
				{
					name: "group1",
					title: "大数据组件",
				},
			],
		});

		// 将Stencil的容器添加到页面中
		stencilContainer.current?.append(stencil.container);

		// 将图形内容居中显示
		graph.centerContent();

		// 创建不同形状的节点
		const n1 = graph.createNode({
			shape: "rect",
			x: 40,
			y: 40,
			width: 80,
			height: 30,
			label: "K8S",
			attrs: commonAttrs,
		});
		const n2 = graph.createNode({
			shape: "rect",
			x: 40,
			y: 40,
			width: 80,
			height: 40,
			label: "SQL",
			attrs: commonAttrs,
		});
		const n3 = graph.createNode({
			shape: "rect",
			x: 40,
			y: 40,
			width: 80,
			height: 40,
			label: "SPARK",
			attrs: commonAttrs,
		});
		const n4 = graph.createNode({
			shape: "rect",
			x: 40,
			y: 40,
			width: 80,
			height: 40,
			label: "FLINK",
			attrs: commonAttrs,
		});

		// 将节点加载到Stencil中的分组中
		stencil.load([n1, n2, n3, n4], "group1");
	});

	return (
		<div className="stencil-app">
			<div className="app-stencil" ref={stencilContainer} />
			<div className="app-content" ref={container} />
		</div>
	);
};
