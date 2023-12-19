export const DATA = {
    nodes: [
        {
            id: "node1",
            shape: "custom-node-width-port",
            label: "算法节点-1",
            x: 130,
            y: 30,

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
            shape: "custom-node-width-port",
            label: "算法节点-2",
            x: 300,
            y: 220,
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
            // 边的样式
            attrs: {
                line: {
                    stroke: "#d5d5d5",
                    strokeWidth: 1,
                    targetMarker: {
                        name: "block", // 箭头类型
                        args: {
                            size: 5, // 箭头的尺寸，这也会影响箭头宽度
                            attrs: {
                                fill: "#d9d9d9", // 箭头的颜色
                            },
                        },
                    },
                }
            },
            router: {
                name: "manhattan",
                args: {
                    startDirections: ["bottom"],
                    endDirections: ["top"],
                },
            },
            connector: {
                name: "rounded",
                args: {
                    type: "arc",
                    size: 5,
                    radius: 0,
                },
            },
            // router: 'orth',
            // connector: 'rounded',
        },
    ],
};