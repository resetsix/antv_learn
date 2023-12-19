// 公共样式
export const commonAttrs = {
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
    },
};