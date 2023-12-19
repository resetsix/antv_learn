import { Graph } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Stencil } from "@antv/x6-plugin-stencil";
import { useMount } from "ahooks";
import { useRef } from "react";
import { DATA } from "./data";

const commonAttrs = {
	body: {
		stroke: "#8f8f8f",
		strokeWidth: 1,
		fill: "#fff",
	},
	img: {
		"xlink:href":
			"https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
		width: 16,
		height: 16,
		x: 12,
		y: 12,
	},
	line: {
		stroke: "#8f8f8f",
		strokeWidth: 1,
	},
};
Graph.registerNode(
	"custom-node-width-port",
	{
		width: 120,
		height: 40,

		markup: [
			{
				tagName: "rect",
				selector: "body",
			},
		],
		attrs: {
			body: {
				stroke: "#bfa",
				strokeWidth: 1,
				fill: "#fff",
				rx: 0,
				ry: 0,
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

export const Example = () => {
	const container = useRef<HTMLDivElement | null>(null);
	const stencilContainer = useRef<HTMLDivElement | null>(null);

	useMount(() => {
		// 创建画布
		const graph = new Graph({
			container: container.current!, // 使用容器的引用
			background: {
				color: "#F2F7FA", // 设置背景颜色
			},
		});

		// 配置对齐线
		graph.use(
			new Snapline({
				enabled: true, // 启用插件
				sharp: true, // 设置插件的属性
			})
		);

		// 为画布中的新增节点添加连接桩
		graph.on("node:added", ({ node, options }) => {
			//节点添加后根据需求添加连接桩
			if (options.stencil) {
				node.addPorts([
					{
						id: "stencil_port_1",
						group: "top",
					},
					{
						id: "stencil_port_2",
						group: "bottom",
					},
				]);
			}
		});

		// 为画布中的新增边添加样式
		graph.on("edge:added", ({ edge, options }) => {
			edge.attr({
				line: {
					stroke: "#8f8f8f",
					strokeWidth: 1,
				},
			});
		});

		graph.fromJSON(DATA);

		// 配置拖拽栏目
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

		// 包含所有节点标签的数组
		const stencilLabelData = ["K8S", "SQL", "SPARK", "FLINK"];

		// 创建不同形状的节点
		const stencilNodesData = stencilLabelData.map((label) =>
			graph.createNode({
				shape: "custom-node-width-port",
				x: 40,
				y: 40,
				rx: 1,
				ry: 1,
				label: label,
				// attrs: commonAttrs,
				attrs: commonAttrs,
			})
		);

		// 将节点加载到Stencil中的分组中
		stencil.load(stencilNodesData, "group1");
	});

	return (
		<div className="stencil-app">
			<div className="app-stencil" ref={stencilContainer} />
			<div className="app-content" ref={container} />
		</div>
	);
};
