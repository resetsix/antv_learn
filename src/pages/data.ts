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
                    stroke: "#8f8f8f",
                    strokeWidth: 1,
                },
            },
            router: {
                name: "manhattan",
                args: {
                    startDirections: ["bottom"],
                    endDirections: ["top"],
                },
            },
            connector: {
                name: "jumpover",
                args: {
                    type: "arc",
                    size: 5,
                    radius: 0,
                },
            },
        },
    ],
};