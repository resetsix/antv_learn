import React, { useRef } from "react";
import { Graph } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Stencil } from "@antv/x6-plugin-stencil";
import { useMount } from "ahooks";

const commonAttrs = {
	body: {
		fill: "#fff",
		stroke: "#8f8f8f",
		strokeWidth: 1,
	},
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

		// 创建一个源节点
		const source = graph.addNode({
			x: 130,
			y: 30,
			width: 100,
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
		});

		// 创建一个目标节点
		const target = graph.addNode({
			x: 320,
			y: 240,
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
		});

		// 创建一条边连接源节点和目标节点
		graph.addEdge({
			source,
			target,
			attrs: {
				line: {
					stroke: "#8f8f8f",
					strokeWidth: 1,
				},
			},
		});

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
			height: 40,
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
