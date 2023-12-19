import { Graph, Node, Shape } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Stencil } from "@antv/x6-plugin-stencil";
import { useMount } from "ahooks";
import { useRef } from "react";
import { DATA } from "./data";
import { commonAttrs } from "./commonAttrs";

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
			container: container.current!,
			grid: true,
			mousewheel: {
				enabled: true,
				zoomAtMousePosition: true,
				modifiers: "ctrl",
				minScale: 0.5,
				maxScale: 3,
			},
			connecting: {
				router: "manhattan",
				connector: {
					name: "rounded",
					args: {
						radius: 8,
					},
				},
				anchor: "center",
				connectionPoint: "anchor",
				allowBlank: false,
				snap: {
					radius: 20,
				},
				createEdge() {
					return new Shape.Edge({
						attrs: {
							...commonAttrs,
							line: {
								...commonAttrs.line,
								targetMarker: {
									name: "block", // 箭头类型
									args: {
										size: 5, // 箭头的尺寸，这也会影响箭头宽度
										attrs: {
											fill: "#d9d9d9", // 箭头的颜色
										},
									},
								},
							},
						},
					});
				},
				validateConnection({ targetMagnet }) {
					return !!targetMagnet;
				},
			},
			highlighting: {
				magnetAdsorbed: {
					name: "stroke",
					args: {
						attrs: {
							fill: "#5F95FF",
							stroke: "#5F95FF",
						},
					},
				},
			},
		});

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

		// 加载数据
		graph.fromJSON(DATA);

		/* 使用插件 */
		// 配置对齐线
		graph.use(
			new Snapline({
				enabled: true, // 启用插件
				sharp: true, // 设置插件的属性
			})
		);

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
				attrs: commonAttrs,
			})
		);
		// 将节点加载到Stencil中的分组中
		stencil.load(stencilNodesData, "group1");

		/* 事件 */
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

		// 事件监听：边连接
		graph.on("edge:connected", ({ isNew, edge, currentCell, currentPort }) => {
			// 获取当前节点（被连接的）
			const node = currentCell as Node;
			node.setPortProp(currentPort as string, "markup", [
				{
					tagName: "path",
					attrs: {
						fill: "#808080",
						d: "M -1 1 L 7 1 L 3 5 L -1 1 Z",
						style: "transform: translateY(-1px)",
					},
				},
			]);
		});
	});

	return (
		<div className="stencil-app">
			<div className="app-stencil" ref={stencilContainer} />
			<div className="app-content" ref={container} />
		</div>
	);
};
